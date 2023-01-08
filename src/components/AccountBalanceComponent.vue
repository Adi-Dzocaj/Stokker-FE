<template>
  <div class="account-balance">
    <h5 class="current-balance">{{ globalStore.accountBalance }} $</h5>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../store/globalStore";

const globalStore = useGlobalStore();
</script>

<style scoped>
.account-balance {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  background-color: #344d67;
  border-radius: 4px;
}

.current-balance {
  color: lightgreen;
}
</style>
