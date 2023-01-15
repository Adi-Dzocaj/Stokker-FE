<template>
  <div class="financials-container">
    <div class="financials">
      <h4>Net worth: {{ accountStore.accountBalance }}</h4>
      <h4>Funds: {{ accountStore.unusedFunds }}</h4>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from "../store/accountStore";

const accountStore = useAccountStore();
</script>

<style scoped>
.financials-container {
  display: flex;
}
.financials {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #344d67;
  border-radius: 8px;
  width: 100%;
  padding: 15px;
}
</style>
