<template>
  <div class="investments" v-if="!loading">
    <div
      v-for="investment in accountDetails.data.investments"
      :key="investment.id"
    >
      <InvestmentComponent
        :title="investment.title"
        :symbol="investment.stockTicker"
        :amount="investment.amountOfStocks"
        :buyPrice="investment.buyPrice"
        :totalValue="investment.totalValue"
        :currentPrice="investment.currentPrice"
        :percentualIncrease="`${investment.percentualDifference} %`"
        :key="investmentComponentKey"
      />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { getAuth } from "firebase/auth";
import ApiData from "../services/ApiData";
import AlpacaData from "../services/AlpacaData";
import InvestmentComponent from "../components/InvestmentComponent.vue";

let accountDetails = ref();
let loading = ref(true);
let percentual_difference_DAY = Number;

let investmentComponentKey = ref(0);
onMounted(async () => {
  loading.value = true;
  accountDetails = await ApiData.getSpecificAccount(getAuth().currentUser.uid);

  await accountDetails.data.investments.filter(async (item) => {
    item.currentPrice = await AlpacaData.getLatestStockInfo(item.stockTicker);
    item.percentualDifference = (
      Math.abs((item.buyPrice - item.currentPrice) / item.buyPrice) * 100
    ).toFixed(3);
    item.totalValue = (item.currentPrice * item.amountOfStocks).toFixed(3);
    investmentComponentKey.value += 1;
    return;
  });

  loading.value = false;
});
</script>

<style scoped>
.investments {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
