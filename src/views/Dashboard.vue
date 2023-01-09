<template>
  <div class="dashboard" v-if="!loading">
    <ModalComponent
      ref="startingCapitalAmount"
      @close-modal="updateBalanceAndCloseModal"
      v-show="showModal"
      buttonContent="Save"
    />
    <div class="account-balance-container">
      <AccountBalance />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import AccountBalance from "../components/AccountBalanceComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { ref, onMounted } from "vue";
import ApiData from "../services/ApiData";
import { getAuth } from "firebase/auth";
import { useUserStore } from "../store/userStore";

let showModal = ref(Boolean);
let loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const specificUser = await ApiData.getSpecificUser(getAuth().currentUser.uid);
  console.log(specificUser.data.account.accountBalance);

  if (specificUser.data.account.accountBalance > 0) {
    showModal.value = false;
  } else {
    showModal.value = true;
  }
  loading.value = false;
});

const startingCapitalAmount = ref(null);

const userStore = useUserStore();

userStore.getUserFromDbAndSetAccountBalanceState();

const updateBalanceAndCloseModal = async () => {
  console.log(getAuth().currentUser.uid);
  console.log(startingCapitalAmount.value.modalAccountBalanceInput);
  getAuth().currentUser;
  await ApiData.updateAccount(getAuth().currentUser.uid, {
    accountBalance: startingCapitalAmount.value.modalAccountBalanceInput,
    unusedFunds: startingCapitalAmount.value.modalAccountBalanceInput,
  });

  userStore.getUserFromDbAndSetAccountBalanceState();

  showModal.value = false;
};
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
