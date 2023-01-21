<template>
  <div class="dashboard-container">
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
      <h4 class="progress-header">Net value progression</h4>
      <Line
        :key="chartComponentKey"
        class="chart"
        :data="chartData_USER"
        :options="options"
      />
      <h4 class="progress-header">Stock progression</h4>
      <Bar
        :key="chartComponentKey"
        class="chart"
        :data="chartData_BAR_INVESTMENTS"
        :options="options"
      />
      <h4 v-if="amountOfInvestments.length > 0" class="progress-header">
        Diversification graphic
      </h4>
      <Pie
        :key="chartComponentKey"
        class="chart"
        :data="chartData_PIE_INVESTMENTS"
        :options="options"
      />
    </div>
    <div class="loading-container" v-else>
      <div><LoadingSpinner /></div>
    </div>
  </div>
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
import LoadingSpinner from "../components/LoadingSpinner.vue";

import { useToast } from "vue-toastification";
const toast = useToast();

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
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

let chartData_USER;
let chartData_BAR_INVESTMENTS;
let chartData_PIE_INVESTMENTS;

let showModal = ref(Boolean);
let loading = ref(true);

let financialsComponentKey = ref(1);
let chartComponentKey = ref(1);

let amountOfInvestments = ref([]);
let percentualDifference = ref([]);
let valueInvestedPerStock = ref([]);

let chartData_PIE_INVESTMENTS_BACKGROUND_COLORS = ref([]);

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

setInterval(() => {
  chartComponentKey.value += 1;
}, 30000);
onMounted(async () => {
  loading.value = true;
  const specificUser = await ApiData.getSpecificUser(getAuth().currentUser.uid);

  if (specificUser.data.account.accountBalance > 0) {
    showModal.value = false;
  } else {
    showModal.value = true;
  }

  await updateAccount();
  await accountStore.getUserAccountAndSetInvestments();
  await userStore.getUserFromDbAndSetFinancials();
  financialsComponentKey.value += 1;

  accountStore.investments.forEach((investment) => {
    amountOfInvestments.value.push(investment.stockTicker);

    if (investment.buyPrice > investment.currentPrice) {
      percentualDifference.value.push(
        `-${(
          Math.abs(
            (investment.buyPrice - investment.currentPrice) /
              investment.buyPrice
          ) * 100
        ).toFixed(3)}`
      );
    } else {
      percentualDifference.value.push(
        `${(
          Math.abs(
            (investment.buyPrice - investment.currentPrice) /
              investment.buyPrice
          ) * 100
        ).toFixed(3)}`
      );
    }

    valueInvestedPerStock.value.push(
      `${investment.amountOfStocks * investment.currentPrice}`
    );
  });

  chartData_USER = {
    labels: ["Beginning", "Now"],
    datasets: [
      {
        label: "USD",
        backgroundColor: "black",
        data: [accountStore.startingCapital, accountStore.accountBalance],
      },
    ],
  };

  chartData_BAR_INVESTMENTS = {
    labels: amountOfInvestments.value,
    datasets: [
      {
        label: "%",
        backgroundColor: "black",
        data: percentualDifference.value,
      },
    ],
  };

  chartData_PIE_INVESTMENTS = {
    labels: amountOfInvestments.value,
    datasets: [
      {
        label: "USD",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(232, 186, 4)",
          "rgb(19, 14, 28)",
          "rgb(87, 85, 137)",
          "rgb(242, 148, 41)",
          "rgb(186, 211, 86)",
          "rgb(156, 24, 173)",
          "rgb(29, 14, 30)",
          "rgb(77, 81, 89)",
          "rgb(140, 127, 46)",
          "rgb(137, 160, 130)",
          "rgb(33, 0, 61)",
          "rgb(50, 19, 53)",
        ],
        data: valueInvestedPerStock.value,
      },
    ],
  };
  loading.value = false;
});

const updateBalanceAndCloseModal = async () => {
  getAuth().currentUser;
  if (
    !startingCapitalAmount.value.modalAccountBalanceInput ||
    startingCapitalAmount.value.modalAccountBalanceInput <= 0
  ) {
    toast.warning("You're trying to fool the system. Stop it!");
  } else {
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
  }
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

.loading-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1024px) {
  .dashboard {
    width: 80%;
  }

  .dashboard-container {
    display: flex;
    justify-content: center;
  }
}

@media screen and (min-width: 1440px) {
  .dashboard {
    width: 65%;
  }
}
</style>
