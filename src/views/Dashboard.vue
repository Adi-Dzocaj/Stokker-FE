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
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();

userStore.getUserFromDbAndSetAccountBalanceState();

// console.log(userStore.getUserFromDbAndSetAccountBalanceState().account);

const updateBalanceAndCloseModal = async () => {
  console.log(getAuth().currentUser.uid);
  getAuth().currentUser;
  await ApiData.updateAccount(getAuth().currentUser.uid, {
    accountBalance: 50000,
    unusedFunds: 50000,
  });

  userStore.getUserFromDbAndSetAccountBalanceState();

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
