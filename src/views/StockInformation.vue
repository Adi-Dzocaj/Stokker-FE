<template>
  <div class="stock-information-container">
    <div class="stock-information" v-if="!loading">
      <div>
        <div class="stock-name">
          <h6>
            {{ stockInformation.name }}
          </h6>
        </div>
        <div class="stock-ticker">
          <p>{{ stockInformation.exchange }} | {{ stockInformation.class }}</p>
          <span>{{ stockInformation.symbol }}</span>
        </div>
      </div>
      <Line
        class="chart"
        :data="
          userRequestedChartDataBasedOnTime[3].active === true
            ? chartData_YEAR
            : userRequestedChartDataBasedOnTime[2].active === true
            ? chartData_MONTH
            : userRequestedChartDataBasedOnTime[1].active === true
            ? chartData_WEEK
            : userRequestedChartDataBasedOnTime[0].active === true
            ? chartData_DAY
            : null
        "
        :options="options"
      />
      <div class="chart-options">
        <button
          :disabled="areOptionButtonsDisabled"
          class="option"
          @click="setActiveData('dayData')"
        >
          1 day
        </button>
        <button
          :disabled="areOptionButtonsDisabled"
          class="option"
          @click="setActiveData('weekData')"
        >
          1 week
        </button>
        <button
          :disabled="areOptionButtonsDisabled"
          class="option"
          @click="setActiveData('monthData')"
        >
          1 month
        </button>
        <button
          :disabled="areOptionButtonsDisabled"
          class="option"
          @click="setActiveData('yearData')"
        >
          1 year
        </button>
      </div>

      <div
        class="purchase-related-data"
        v-if="stockData_DAY && stockData_DAY.length > 0"
      >
        <div class="purchase-related-data-header">
          <h4>Stock info</h4>
          <h6>-{{ current_stock_related_date }}</h6>
        </div>
        <div class="current-day-stock-data">
          <div class="data-box">
            <p class="data-box-title">Opened at</p>
            <p>{{ stockData_DAY[0].c }} $</p>
          </div>
          <div class="data-box">
            <p class="data-box-title">Current price</p>
            <p>{{ stockData_DAY[stockData_DAY.length - 1].c }} $</p>
          </div>
          <div class="data-box">
            <p class="data-box-title">Lowest today</p>
            <p v-if="stockData_WHOLE_DAY">{{ stockData_WHOLE_DAY[0].l }} $</p>
            <p v-else>Market is closed</p>
          </div>
          <div class="data-box">
            <p></p>
            <p class="data-box-title">Highest today</p>
            <p v-if="stockData_WHOLE_DAY">{{ stockData_WHOLE_DAY[0].h }} $</p>
            <p v-else>Market is closed</p>
          </div>
          <div class="data-box">
            <p></p>
            <p class="data-box-title">Percentual movement</p>
            <p
              class="negative-result"
              v-if="
                stockData_DAY[0].c > stockData_DAY[stockData_DAY.length - 1].c
              "
            >
              -{{ percentual_difference_DAY.toFixed(3) }} %
            </p>
            <p class="positive-percentage" v-else>
              +{{ percentual_difference_DAY.toFixed(3) }} %
            </p>
          </div>
        </div>
      </div>
      <div class="market-closed-announcement" v-else>
        - Market is closed today -
      </div>
      <div @click="showModal = true" class="buy-button-container">
        <GeneralButton
          color="#ffe1a1"
          backgroundColor="#344d67"
          content="Place order"
          fsize="12px"
          padding="10px"
          :key="toggleToReRenderGeneralButton"
        />
      </div>
      <div class="modal-container" v-show="showModal">
        <div class="modal" v-on:clickout="showModal = false">
          <h5>{{ stockInformation.name }}</h5>
          <div class="modal-content">
            <p>Input the stock amount</p>
            <div class="input">
              <input type="number" v-model="amountOfStock" />
            </div>
            <p>
              Total price:
              <span v-show="!totalPurchasePriceLoader && amountOfStock">{{
                stockPriceTimesAmountOfStock
              }}</span>
              $
            </p>
            <p>
              Account funds after purchase:
              <span v-show="amountOfStock"
                >{{
                  (
                    accountStore.unusedFunds - stockPriceTimesAmountOfStock
                  ).toFixed(3)
                }}
              </span>
              $
            </p>
            <p
              v-if="isPurchaseValueHigherThanUnusedFunds"
              class="negative-result"
            >
              {{ cantMakePurchase }}
            </p>
            <div class="dynamic-purchase-information"></div>
            <div class="modalButton" @click="addInvestmentToUser()">
              <GeneralButton
                :disabled="
                  isPurchaseValueHigherThanUnusedFunds || !amountOfStock
                "
                content="Place order"
                color="#ffe1a1"
                backgroundColor="#344d67"
                fsize="12px"
                padding="10px"
              />
            </div>
          </div>
        </div>
      </div>

      <ArticleSectionHeaderComponent />
      <div class="news-articles" v-for="article in stockNews" :key="article.id">
        <ArticleComponent :content="article.headline" :location="article.url" />
      </div>
    </div>

    <div class="loading-container" v-else>
      <div><LoadingSpinner /></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref, reactive, watch } from "vue";
import GeneralButton from "../components/GeneralButton.vue";
import ApiData from "../services/ApiData";
import AlpacaData from "../services/AlpacaData";
import ArticleComponent from "../components/ArticleComponent.vue";
import ArticleSectionHeaderComponent from "../components/ArticleSectionHeaderComponent.vue";
import { useAccountStore } from "../store/accountStore";
import { useUserStore } from "../store/userStore";
import "clickout-event";
import { useToast } from "vue-toastification";
import router from "/src/router/index.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const toast = useToast();

const accountStore = useAccountStore();
const userStore = useUserStore();

const YEAR_IN_MILLISECONDS = 31556926000;
const MONTH_IN_MILLISECONDS = 2592000000;
const WEEK_IN_MILLISECONDS = 604800000;
const DAY_IN_MILLISECONDS = 86400000;
const MINUTE_IN_MILLISECONDS = 60000;

let showModal = ref(false);

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
import { getAuth } from "@firebase/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let chartData_YEAR = Array;
let chartData_MONTH = Array;
let chartData_WEEK = Array;
let chartData_DAY = Array;

let stockData_YEAR = ref([]);
let stockData_MONTH = ref([]);
let stockData_WEEK = ref([]);
let stockData_DAY = ref([]);

let stockData_WHOLE_DAY = ref([]);

let current_stock_related_date;

let amountOfStock = ref();

let stockPriceTimesAmountOfStock = ref();

let toggleToReRenderGeneralButton = ref(false);

let isPurchaseValueHigherThanUnusedFunds = ref();
let cantMakePurchase = "Unsufficient amount of funds.";

let totalPurchasePriceLoader = ref(false);

const amountOfBars_YEAR = [];
const closingValueBars_YEAR = [];

const amountOfBars_MONTH = [];
const closingValueBars_MONTH = [];

const amountOfBars_WEEK = [];
const closingValueBars_WEEK = [];

const amountOfBars_DAY = [];
const closingValueBars_DAY = [];

let percentual_difference_DAY = Number;

let stockInformation = reactive({});
let stockNews = ref([]);
let loading = ref(true);

let areOptionButtonsDisabled = ref(false);

let userRequestedChartDataBasedOnTime = reactive([
  { title: "dayData", active: true },
  { title: "weekData", active: false },
  { title: "monthData", active: false },
  { title: "yearData", active: false },
]);

const setActiveData = (title) => {
  areOptionButtonsDisabled.value = true;
  userRequestedChartDataBasedOnTime.forEach((item) => {
    item.active = false;
  });

  userRequestedChartDataBasedOnTime.map((item) => {
    if (item.title === title) {
      item.active = true;
    }
  });

  // Users are timed out for one second before being able to request a different timeSpan on chartData
  setTimeout(() => {
    areOptionButtonsDisabled.value = false;
  }, 1000);
};
const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
});

const options = {
  responsive: true,
};

const setCurrentStockRelatedDate = () => {
  let currentYear;
  let currentMonth;
  let currentDay;

  if (stockData_DAY) {
    currentYear = new Date(stockData_DAY[0].t).getFullYear();

    if (new Date(stockData_DAY[0].t).getMonth() + 1 < 10) {
      currentMonth = (new Date(stockData_DAY[0].t).getMonth() + 1)
        .toString()
        .padStart(2, 0);
    } else if (new Date(stockData_DAY[0].t).getMonth() + 1 > 10) {
      currentMonth = (new Date(stockData_DAY[0].t).getMonth() + 1).toString();
    }

    if (new Date(stockData_DAY[0].t).getDate() + 1 < 10) {
      currentDay = (new Date(stockData_DAY[0].t).getDate() + 1)
        .toString()
        .padStart(2, 0);
    } else if (new Date(stockData_DAY[0].t).getDate() + 1 > 10) {
      currentDay = (new Date(stockData_DAY[0].t).getDate() + 1).toString();
    }
  }

  current_stock_related_date = `${currentYear}-${currentMonth}-${currentDay}`;
};

const addInvestmentToUser = async () => {
  if (amountOfStock.value <= 0 || !amountOfStock) {
    toast.warning("You're trying to fool the system. Stop it!");
  } else {
    let investmentDetails = {
      Title: stockInformation.name,
      StockTicker: stockInformation.symbol,
      AmountOfStocks: amountOfStock.value,
      CurrentPrice: stockData_WEEK[stockData_WEEK.length - 1].c,
      BuyPrice: stockData_WEEK[stockData_WEEK.length - 1].c,
      PurchasedAt: `${new Date(
        new Date().getTime() - MINUTE_IN_MILLISECONDS * 20
      )
        .toISOString()
        .slice(0, -5)}Z`,
    };

    const response = await ApiData.postInvestment(
      getAuth().currentUser.uid,
      investmentDetails
    );
    userStore.getUserFromDbAndSetFinancials();
    toast.success(
      `Purchase of ${amountOfStock.value} ${stockInformation.symbol} complete!`
    );
    setTimeout(() => {
      toast.success(`Updated funds: ${accountStore.unusedFunds} $`);
    }, 5000);

    router.push("/dashboard");
  }
};

onMounted(async () => {
  loading.value = true;

  let CURRENT_TIME_MINUS_20_MIN_ISO = `${new Date(
    new Date().getTime() - MINUTE_IN_MILLISECONDS * 20
  )
    .toISOString()
    .slice(0, -5)}Z`;

  let CURRENT_TIME_MINUS_1_YEAR_ISO = `${new Date(
    new Date().getTime() - YEAR_IN_MILLISECONDS
  )
    .toISOString()
    .slice(0, -5)}Z`;

  let CURRENT_TIME_MINUS_1_MONTH_ISO = `${new Date(
    new Date().getTime() - MONTH_IN_MILLISECONDS
  )
    .toISOString()
    .slice(0, -5)}Z`;

  let CURRENT_TIME_MINUS_1_WEEK_ISO = `${new Date(
    new Date().getTime() - WEEK_IN_MILLISECONDS
  )
    .toISOString()
    .slice(0, -5)}Z`;

  let CURRENT_TIME_MINUS_1_DAY_ISO = `${new Date(
    new Date().getTime() - DAY_IN_MILLISECONDS
  )
    .toISOString()
    .slice(0, -5)}Z`;

  stockData_YEAR = await AlpacaData.getStockInfo(
    props.symbol,
    CURRENT_TIME_MINUS_1_YEAR_ISO,
    CURRENT_TIME_MINUS_20_MIN_ISO,
    "1Month"
  );

  stockData_MONTH = await AlpacaData.getStockInfo(
    props.symbol,
    CURRENT_TIME_MINUS_1_MONTH_ISO,
    CURRENT_TIME_MINUS_20_MIN_ISO,
    "1Day"
  );
  stockData_WEEK = await AlpacaData.getStockInfo(
    props.symbol,
    CURRENT_TIME_MINUS_1_WEEK_ISO,
    CURRENT_TIME_MINUS_20_MIN_ISO,
    "59Min"
  );

  stockData_DAY = await AlpacaData.getStockInfo(
    props.symbol,
    CURRENT_TIME_MINUS_1_DAY_ISO,
    CURRENT_TIME_MINUS_20_MIN_ISO,
    "59Min"
  );

  stockData_WHOLE_DAY = await AlpacaData.getStockInfo(
    props.symbol,
    CURRENT_TIME_MINUS_1_DAY_ISO,
    CURRENT_TIME_MINUS_20_MIN_ISO,
    "1Day"
  );

  if (stockData_YEAR) {
    stockData_YEAR.forEach((bar) => {
      amountOfBars_YEAR.push("");
      closingValueBars_YEAR.push(bar.c);
    });
  }

  if (stockData_MONTH) {
    stockData_MONTH.forEach((bar) => {
      amountOfBars_MONTH.push("");
      closingValueBars_MONTH.push(bar.c);
    });
  }

  if (stockData_WEEK) {
    stockData_WEEK.forEach((bar) => {
      amountOfBars_WEEK.push("");
      closingValueBars_WEEK.push(bar.c);
    });
  }
  if (stockData_DAY) {
    stockData_DAY.forEach((bar) => {
      amountOfBars_DAY.push("");
      closingValueBars_DAY.push(bar.c);
    });

    percentual_difference_DAY =
      Math.abs(
        (stockData_DAY[0].c - stockData_DAY[stockData_DAY.length - 1].c) /
          stockData_DAY[0].c
      ) * 100;
  }

  stockInformation = await AlpacaData.getSingleStock(props.symbol);

  stockNews = await AlpacaData.getSingleNewsArticle(props.symbol);

  setCurrentStockRelatedDate();

  if (stockData_WEEK) {
    stockPriceTimesAmountOfStock =
      amountOfStock.value *
      stockData_WEEK[stockData_WEEK.length - 1].c.toFixed(3);
  }

  watch(amountOfStock, () => {
    totalPurchasePriceLoader.value = true;

    stockPriceTimesAmountOfStock = (
      amountOfStock.value * stockData_WEEK[stockData_WEEK.length - 1].c
    ).toFixed(3);

    if (stockPriceTimesAmountOfStock > accountStore.unusedFunds) {
      isPurchaseValueHigherThanUnusedFunds = true;
    } else {
      isPurchaseValueHigherThanUnusedFunds = false;
    }

    toggleToReRenderGeneralButton.value = !toggleToReRenderGeneralButton.value;

    totalPurchasePriceLoader.value = false;
  });

  userStore.getUserFromDbAndSetFinancials();

  chartData_YEAR = {
    labels: amountOfBars_YEAR,
    datasets: [
      {
        label: "1 YEAR",
        backgroundColor: "black",
        data: closingValueBars_YEAR,
      },
    ],
  };

  chartData_MONTH = {
    labels: amountOfBars_MONTH,
    datasets: [
      {
        label: "1 MONTH",
        backgroundColor: "black",
        data: closingValueBars_MONTH,
      },
    ],
  };

  chartData_WEEK = {
    labels: amountOfBars_WEEK,
    datasets: [
      {
        label: "1 WEEK",
        backgroundColor: "black",
        data: closingValueBars_WEEK,
      },
    ],
  };

  chartData_DAY = {
    labels: amountOfBars_DAY,
    datasets: [
      {
        label: "1 DAY",
        backgroundColor: "black",
        data: closingValueBars_DAY,
      },
    ],
  };

  loading.value = false;
});
</script>

<style scoped>
.stock-information {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
}

.stock-name {
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

.stock-ticker {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stock-ticker span {
  color: #808080;
}

.stock-ticker p {
  font-size: 12px;
}

.chart {
  max-height: 300px;
}

.chart-options {
  display: flex;
  margin-bottom: 20px;
}

.option {
  border: 1px solid lightgray;
  flex-grow: 1;
  text-align: center;
  padding: 5px;
  background-color: white;
}

.option:hover {
  background-color: #344d67;
  color: #ffe1a1;
}

.purchase-related-data-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.purchase-related-data-header h6 {
  color: #808080;
}

.purchase-related-data h4 {
  display: inline;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
}

.current-day-stock-data {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.data-box {
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;
  font-size: 12px;
  margin-bottom: 15px;
}

.data-box-title {
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid lightgray;
}

.negative-result {
  color: red;
}

.positive-percentage {
  color: green;
}

.buy-button-container:hover {
  cursor: pointer;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000071;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  background-color: white;
  width: 300px;
  padding: 10px;
  padding-bottom: 40px;
  padding-top: 40px;
  border: 3px solid #344d67;
  border-radius: 10px;
}

.modal h5 {
  text-align: center;
  margin-bottom: 30px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.modal-content p {
  font-size: 12px;
}

.input {
  display: flex;
  gap: 10px;
}

.input input {
  width: 100%;
}

.muted-text {
  color: #808080;
}

.modalButton:hover {
  cursor: pointer;
}

.market-closed-announcement {
  text-align: center;
}

.loading-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1024px) {
  .stock-information {
    width: 80%;
  }
  .stock-information-container {
    display: flex;
    justify-content: center;
  }
}

@media screen and (min-width: 1440px) {
  .stock-information {
    width: 65%;
  }
}
</style>
