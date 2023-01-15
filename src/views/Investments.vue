<template>
  <div class="investments">
    <InvestmentComponent
      v-for="investment in accountDetails.data.investments"
      :key="investment.id"
      :title="investment.title"
      :symbol="investment.stockTicker"
      :buyPrice="investment.buyPrice"
      currentPrice="400"
      percentualIncrease="10%"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getAuth } from "firebase/auth";
import ApiData from "../services/ApiData";
import InvestmentComponent from "../components/InvestmentComponent.vue";

let accountDetails = ref();

onBeforeMount(async () => {
  const response = await ApiData.getSpecificAccount(getAuth().currentUser.uid);
  accountDetails = response;
  console.log(accountDetails);
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
