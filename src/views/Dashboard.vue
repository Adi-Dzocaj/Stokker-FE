<template>
  <div class="dashboard">
    <ModalComponent
      @close-modal="updateBalanceAndCloseModal"
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
import ApiData from "../services/ApiData";
import { getAuth } from "firebase/auth";

const updateBalanceAndCloseModal = async () => {
  console.log(getAuth().currentUser.uid);
  getAuth().currentUser;
  await ApiData.updateAccount(getAuth().currentUser.uid, {
    accountBalance: 1,
    unusedFunds: 1,
  });

  showModal = false;
};
let showModal = ref(true);
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

http://localhost:62237/api/Account/gvL8pS839iYbThrc5LvbsnqTMe52
