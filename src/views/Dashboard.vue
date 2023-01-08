<template>
  <div class="dashboard">
    <ModalComponent
      @close-modal="showModal = false"
      v-show="showModal"
      buttonContent="Save"
    />
    <div class="account-balance-container">
      <AccountBalance />
    </div>
  </div>
</template>

<script setup>
import AccountBalance from "../components/AccountBalanceComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { ref } from "vue";

const showModal = ref(true);
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
