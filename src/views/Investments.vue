<template>
  <div class="investments" v-if="!loading">
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
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";
import ApiData from "../services/ApiData";
import InvestmentComponent from "../components/InvestmentComponent.vue";

let accountDetails = ref();
let loading = ref(true);

onMounted(async () => {
  loading.value = true;
  accountDetails = await ApiData.getSpecificAccount(getAuth().currentUser.uid);
  console.log(accountDetails.data.investments);
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
