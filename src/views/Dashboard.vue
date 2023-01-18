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
    <h4 class="progress-header">My progress</h4>
    <Line class="chart" :data="chartData_USER" :options="options" />
    <h4 class="progress-header">My best investments</h4>
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

// ChartJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let chartData_USER;

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
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

  chartData_USER = {
    labels: ["Beginning", "Now"],
    datasets: [
      {
        label: "",
        backgroundColor: "black",
        data: [accountStore.startingCapital, accountStore.accountBalance],
      },
    ],
  };
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

.financials-container {
  margin-bottom: 30px;
}

.progress-header {
  display: inline;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
}

.chart {
  max-height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
