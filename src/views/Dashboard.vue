<template>
  <div class="dashboard" v-if="!loading">
    <ModalComponent
      ref="startingCapitalAmount"
      @close-modal="updateBalanceAndCloseModal"
      v-show="showModal"
      buttonContent="Save"
    />
    <div class="financials-container">
      <FinancialsComponent :key="financialsComponentKey" />
    </div>

    <router-link to="/stockpanel">stockpanel</router-link>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import FinancialsComponent from "../components/FinancialsComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { ref, onMounted } from "vue";
import ApiData from "../services/ApiData";
import { getAuth } from "firebase/auth";
import { useUserStore } from "../store/userStore";
import { useAccountStore } from "../store/accountStore";
import { useGlobalStore } from "../store/globalStore";

let showModal = ref(Boolean);
let loading = ref(true);

let financialsComponentKey = ref(1);

let areInvestmentsLoaded = ref(false);

const startingCapitalAmount = ref(null);

const HOUR_IN_MILLISECONDS = 3600000;

const userStore = useUserStore();
const globalStore = useGlobalStore();
const accountStore = useAccountStore();

const updateAccount = async () => {
  await globalStore.setCurrentPricesUpdateAccount();
  await ApiData.updateAccountFundsBasedOnCurrentInvestmentsAndUnusedFunds(
    getAuth().currentUser.uid
  );
};

setInterval(async () => {
  await updateAccount();
  await accountStore.getUserAccountAndSetInvestments();
  await userStore.getUserFromDbAndSetFinancials();
  financialsComponentKey.value += 1;
}, 10000);
onMounted(async () => {
  loading.value = true;
  const specificUser = await ApiData.getSpecificUser(getAuth().currentUser.uid);
  console.log(specificUser.data.account.accountBalance);

  if (specificUser.data.account.accountBalance > 0) {
    showModal.value = false;
  } else {
    showModal.value = true;
  }

  await updateAccount();
  await accountStore.getUserAccountAndSetInvestments();
  await userStore.getUserFromDbAndSetFinancials();
  financialsComponentKey.value += 1;
  console.log(financialsComponentKey.value);
  console.log(accountStore.accountBalance);

  loading.value = false;
});

const updateBalanceAndCloseModal = async () => {
  console.log(getAuth().currentUser.uid);
  console.log(startingCapitalAmount.value.modalAccountBalanceInput);
  getAuth().currentUser;
  await ApiData.updateAccount(getAuth().currentUser.uid, {
    startingCapital: startingCapitalAmount.value.modalAccountBalanceInput,
    accountBalance: startingCapitalAmount.value.modalAccountBalanceInput,
    unusedFunds: startingCapitalAmount.value.modalAccountBalanceInput,
    creationDate: `${new Date(new Date().getTime() + HOUR_IN_MILLISECONDS)
      .toISOString()
      .slice(0, -5)}Z`,
  });

  userStore.getUserFromDbAndSetFinancials();

  showModal.value = false;
};
</script>

<style scoped>
.dashboard {
  margin: 20px;
}
</style>
