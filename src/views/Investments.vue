<template>
  <div class="investments-panel" v-if="!loading && accountDetails">
    <div v-if="accountDetails.length === 0">
      <h4 class="portfolio-empty-header">Your portfolio is empty.</h4>
    </div>
    <h4 v-show="accountDetails.length > 0">
      All individual investments ({{ accountDetails.length }})
    </h4>
    <div v-for="(investment, index) in accountDetails" :key="investment.id">
      <div @click="setClickedInvestmentIndex(index)">
        <InvestmentComponent
          :title="investment.title"
          :symbol="investment.stockTicker"
          :amount="investment.amountOfStocks"
          :buyPrice="investment.buyPrice"
          :totalValue="investment.totalValue"
          :currentPrice="investment.currentPrice"
          :percentualDifference="`${investment.percentualDifference} %`"
          :key="investmentComponentKey"
        />
      </div>
    </div>
    <div v-if="accountDetails.length > 0">
      <div class="modal-container" v-show="globalStore.showModal">
        <div class="modal" v-if="accountDetails[clickedInvestment]">
          <h5>
            {{ accountDetails[clickedInvestment].title }}
          </h5>
          <div class="modal-content">
            <p>
              You currently own
              {{ accountDetails[clickedInvestment].amountOfStocks }}
              "{{ accountDetails[clickedInvestment].stockTicker }}" stock at
              {{ accountDetails[clickedInvestment].currentPrice }}
              $ each.
            </p>
            <p>Input the amount of stocks you wish to sell</p>
            <div class="input">
              <input type="text" v-model="amountOfStock" />
            </div>
            <p>
              Total price:
              <span v-show="!totalPurchasePriceLoader">{{
                stockPriceTimesAmountOfStock.toFixed(3)
              }}</span>
              $
            </p>
            <p>
              Account funds after sale:
              {{ accountStore.unusedFunds + stockPriceTimesAmountOfStock }}
              $
            </p>
            <p v-if="isRequestedSaleAmountTooHigh" class="negative-result">
              You dont own that many "{{
                accountDetails[clickedInvestment].stockTicker
              }}" stock
            </p>
            <div
              class="modalButton"
              @click="sellStockAndAddSaleValueToUnusedFunds()"
            >
              <GeneralButton
                :disabled="isRequestedSaleAmountTooHigh"
                content="Sell stock"
                color="#ffe1a1"
                backgroundColor="#344d67"
                fsize="12px"
                padding="10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { getAuth } from "firebase/auth";
import ApiData from "../services/ApiData";
import AlpacaData from "../services/AlpacaData";
import GeneralButton from "../components/GeneralButton.vue";
import InvestmentComponent from "../components/InvestmentComponent.vue";
import { useGlobalStore } from "../store/globalStore";
import { useAccountStore } from "../store/accountStore";
import { useUserStore } from "../store/userStore";
import { useToast } from "vue-toastification";
import router from "/src/router/index.js";

const toast = useToast();

let accountDetails = ref([]);
let loading = ref(true);
let percentual_difference_DAY = Number;

let clickedInvestment = ref(0);
let clickedInvestmentLoader = ref(true);
const globalStore = useGlobalStore();
const accountStore = useAccountStore();
const userStore = useUserStore();
let amountOfStock = ref(1);

let isRequestedSaleAmountTooHigh = ref(false);
let totalPurchasePriceLoader = ref(true);

let stockPriceTimesAmountOfStock = ref(0);

let setClickedInvestmentIndex = (index) => {
  clickedInvestmentLoader.value = true;
  clickedInvestment.value = index;
  clickedInvestmentLoader.value = false;
};

const setAccountDetails = async () => {
  accountDetails = await ApiData.getSpecificAccountInvestments(
    getAuth().currentUser.uid
  );

  await accountDetails.filter(async (item) => {
    if (item.buyPrice > item.currentPrice) {
      item.percentualDifference = `-${(
        Math.abs((item.buyPrice - item.currentPrice) / item.buyPrice) * 100
      ).toFixed(3)}`;
    } else {
      item.percentualDifference = `${(
        Math.abs((item.buyPrice - item.currentPrice) / item.buyPrice) * 100
      ).toFixed(3)}`;
    }

    item.totalValue = (item.currentPrice * item.amountOfStocks).toFixed(3);
    userStore.getUserFromDbAndSetFinancials();
    investmentComponentKey.value += 1;
    return;
  });
};

const sellStockAndAddSaleValueToUnusedFunds = async () => {
  loading.value = true;
  if (
    amountOfStock.value > accountDetails[clickedInvestment.value].amountOfStocks
  ) {
    toast.warning("You're trying to fool the system. Stop it!");
  } else {
    const response = await ApiData.updateInvestmentUpdateAccount(
      accountDetails[clickedInvestment.value].id,
      {
        amountOfStocks: amountOfStock.value,
      }
    );

    setAccountDetails();

    userStore.getUserFromDbAndSetFinancials();
    toast.success(
      `Sale of ${amountOfStock.value} ${
        accountDetails[clickedInvestment.value].stockTicker
      } complete!`
    );
    setTimeout(() => {
      toast.success(`Updated funds: ${accountStore.unusedFunds} $`);
    }, 5000);

    amountOfStock.value = 1;
    globalStore.showModal = false;
  }

  loading.value = false;
};

let isRequestedSaleAmountHigherThanCurrentAmount = (index) => {
  if (accountDetails[index].amountOfStocks < amountOfStock.value) {
    isRequestedSaleAmountTooHigh = true;
  } else {
    isRequestedSaleAmountTooHigh = false;
  }
};

const setTotalSaleValue = (index) => {
  totalPurchasePriceLoader.value = true;
  stockPriceTimesAmountOfStock.value =
    amountOfStock.value * accountDetails[index].currentPrice;
  totalPurchasePriceLoader.value = false;
};

watch(
  () => globalStore.showModal,
  () => {
    if (!clickedInvestmentLoader) {
      setTotalSaleValue(clickedInvestment.value);
    }
  }
);

watch(amountOfStock, () => {
  isRequestedSaleAmountHigherThanCurrentAmount(clickedInvestment.value);
  setTotalSaleValue(clickedInvestment.value);
});

let investmentComponentKey = ref(0);
onMounted(async () => {
  loading.value = true;

  await setAccountDetails();

  // Verify that this works
  await globalStore.setCurrentPricesUpdateAccount();

  loading.value = false;
});
</script>

<style scoped>
.investments-panel {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.investment-container {
  width: 100%;
  border: 2px solid #344d67;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.investment-container h5 {
  border-bottom: 1px solid lightgray;
  padding: 4px;
}

.investment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.investment-header h6 {
  color: #808080;
}

.investment-content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.data-piece {
  display: flex;
  flex-direction: column;
  padding: 4px;
}

/* Modal */

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000005;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  background-color: white;
  width: 300px;
  padding: 10px;
  padding-bottom: 40px;
  padding-top: 40px;
  border: 3px solid #344d67;
  border-radius: 10px;
}

.modal h5 {
  text-align: center;
  margin-bottom: 30px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.modal-content p {
  font-size: 12px;
}

.input {
  display: flex;
  gap: 10px;
}

.input input {
  width: 100%;
}

.muted-text {
  color: #808080;
}

.modalButton:hover {
  cursor: pointer;
}

.negative-result {
  color: red;
}

.portfolio-empty-header {
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
  text-align: center;
  margin-bottom: 10px;
}

.stockpanel-link {
  text-decoration: none;
}

.stockpanel-link:hover {
  text-decoration: underline;
}
</style>
