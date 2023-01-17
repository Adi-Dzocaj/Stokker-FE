<template>
  <div
    class="investments-panel"
    v-if="!loading && accountDetails.data.investments"
  >
    <div
      v-for="(investment, index) in accountDetails.data.investments"
      :key="investment.id"
    >
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
    <div class="modal-container" v-show="globalStore.showModal">
      <div class="modal">
        <h5>
          {{ accountDetails.data.investments[clickedInvestment].title }}
        </h5>
        <div class="modal-content">
          <p>
            You currently own
            {{
              accountDetails.data.investments[clickedInvestment].amountOfStocks
            }}
            "{{
              accountDetails.data.investments[clickedInvestment].stockTicker
            }}" stock at
            {{
              accountDetails.data.investments[clickedInvestment].currentPrice
            }}
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
            Account funds after purchase:
            {{ accountStore.unusedFunds + stockPriceTimesAmountOfStock }}
            $
          </p>
          <p v-if="isRequestedSaleAmountTooHigh" class="negative-result">
            You dont own that many "{{
              accountDetails.data.investments[clickedInvestment].stockTicker
            }}" stock
          </p>
          <div class="modalButton">
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
  <div v-else>Loading...</div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from "vue";
import { getAuth } from "firebase/auth";
import ApiData from "../services/ApiData";
import AlpacaData from "../services/AlpacaData";
import GeneralButton from "../components/GeneralButton.vue";
import InvestmentComponent from "../components/InvestmentComponent.vue";
import { useGlobalStore } from "../store/globalStore";
import { useAccountStore } from "../store/accountStore";
import { useUserStore } from "../store/userStore";

let accountDetails = ref();
let loading = ref(true);
let percentual_difference_DAY = Number;

let clickedInvestment = ref(0);
const globalStore = useGlobalStore();
const accountStore = useAccountStore();
const userStore = useUserStore();
let amountOfStock = ref(1);

let isRequestedSaleAmountTooHigh = ref(false);
console.log(clickedInvestment.value);
let totalPurchasePriceLoader = ref(true);

let stockPriceTimesAmountOfStock = ref(0);

let setClickedInvestmentIndex = (index) => {
  clickedInvestment.value = index;
  console.log(clickedInvestment.value);
};

let isRequestedSaleAmountHigherThanCurrentAmount = (index) => {
  if (
    accountDetails.data.investments[index].amountOfStocks < amountOfStock.value
  ) {
    isRequestedSaleAmountTooHigh = true;
  } else {
    isRequestedSaleAmountTooHigh = false;
  }
};

const setTotalSaleValue = (index) => {
  totalPurchasePriceLoader = true;
  stockPriceTimesAmountOfStock.value =
    amountOfStock.value * accountDetails.data.investments[index].currentPrice;
  totalPurchasePriceLoader = false;
};

watch(amountOfStock, () => {
  isRequestedSaleAmountHigherThanCurrentAmount(clickedInvestment.value);
  setTotalSaleValue(clickedInvestment.value);
});

let investmentComponentKey = ref(0);
onBeforeMount(async () => {
  loading.value = true;
  accountDetails = await ApiData.getSpecificAccount(getAuth().currentUser.uid);

  await accountDetails.data.investments.filter(async (item) => {
    item.currentPrice = await AlpacaData.getLatestStockInfo(item.stockTicker);
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
  console.log(accountDetails.data.investments[clickedInvestment.value].title);
  // $forceUpdate();
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
</style>
