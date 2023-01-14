<template>
  <div class="financial-data">
    <h5>Portfolio value</h5>
    <h5 class="current-balance">{{ accountStore.accountBalance }} $</h5>
  </div>
  <div class="financial-data">
    <h5>Funds</h5>
    <h5 class="current-balance">{{ accountStore.unusedFunds }} $</h5>
    <h5></h5>
  </div>
</template>

<script setup>
import { useAccountStore } from "../store/accountStore";

const accountStore = useAccountStore();
</script>

<style scoped>
.financial-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  width: 40%;
  background-color: #d3e785;
  border-radius: 4px;
}

.financials-container h5 {
  color: #344d67;
}

.current-balance {
  color: #344d67;
}
</style>
