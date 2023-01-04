<template>
  <div class="dashboard">
    <div class="account-balance-container">
      <AccountBalance />
    </div>
  </div>
</template>

<script setup>
import AccountBalance from "../components/AccountBalanceComponent.vue";
</script>

<style scoped>
.dashboard {
  margin: 20px;
}

.account-balance-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
