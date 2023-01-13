<template>
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

    <div class="purchase-related-data" v-if="stockData_DAY.length > 0">
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
          <p class="data-box-title">Closed at</p>
          <p>{{ stockData_DAY[stockData_DAY.length - 1].c }} $</p>
        </div>
        <div class="data-box">
          <p class="data-box-title">Lowest today</p>
          <p>{{ stockData_WHOLE_DAY[0].l }} $</p>
        </div>
        <div class="data-box">
          <p></p>
          <p class="data-box-title">Highest today</p>
          <p>{{ stockData_WHOLE_DAY[0].h }} $</p>
        </div>
        <div class="data-box">
          <p></p>
          <p class="data-box-title">Percentual movement</p>
          <p
            class="positive-percentage"
            v-if="
              stockData_DAY[0].c > stockData_DAY[stockData_DAY.length - 1].c
            "
          >
            -{{ percentual_difference_DAY.toFixed(3) }} %
          </p>
          <p class="negative-percentage" v-else>
            +{{ percentual_difference_DAY.toFixed(3) }} %
          </p>
        </div>
      </div>
    </div>

    <ArticleSectionHeaderComponent />
    <div class="news-articles" v-for="article in stockNews" :key="article.id">
      <ArticleComponent :content="article.headline" :location="article.url" />
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref, reactive } from "vue";
import AlpacaData from "../services/AlpacaData";
import ArticleComponent from "../components/ArticleComponent.vue";
import ArticleSectionHeaderComponent from "../components/ArticleSectionHeaderComponent.vue";

const YEAR_IN_MILLISECONDS = 31556926000;
const MONTH_IN_MILLISECONDS = 2592000000;
const WEEK_IN_MILLISECONDS = 604800000;
const DAY_IN_MILLISECONDS = 86400000;
const MINUTE_IN_MILLISECONDS = 60000;

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

console.log(userRequestedChartDataBasedOnTime);

const setActiveData = (title) => {
  areOptionButtonsDisabled.value = true;
  console.log(areOptionButtonsDisabled);
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
  console.log(userRequestedChartDataBasedOnTime);
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

  currentYear = new Date(stockData_DAY[0].t).getFullYear();
  if (new Date(stockData_DAY[0].t).getMonth() + 1 < 10) {
    currentMonth = (new Date(stockData_DAY[0].t).getMonth() + 1)
      .toString()
      .padStart(2, 0);
  } else {
    currentMonth = (new Date(stockData_DAY[0].t).getMonth() + 1).toString();
  }

  if (new Date(stockData_DAY[0].t).getDate() + 1 < 10) {
    currentDay = (new Date(stockData_DAY[0].t).getDate() + 1)
      .toString()
      .padStart(2, 0);
  } else {
    currentDay = (new Date(stockData_DAY[0].t).getDate() + 1).toString();
  }
  console.log(currentYear);
  console.log(currentMonth);
  console.log(currentDay);

  current_stock_related_date = `${currentYear}-${currentMonth}-${currentDay}`;
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

  console.log(CURRENT_TIME_MINUS_1_YEAR_ISO);

  console.log("2022-01-01T0:00:00Z");

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

  stockData_YEAR.forEach((bar) => {
    amountOfBars_YEAR.push("");
    closingValueBars_YEAR.push(bar.c);
  });

  stockData_MONTH.forEach((bar) => {
    amountOfBars_MONTH.push("");
    closingValueBars_MONTH.push(bar.c);
  });

  stockData_WEEK.forEach((bar) => {
    amountOfBars_WEEK.push("");
    closingValueBars_WEEK.push(bar.c);
  });

  stockData_DAY.forEach((bar) => {
    amountOfBars_DAY.push("");
    closingValueBars_DAY.push(bar.c);
  });

  percentual_difference_DAY =
    Math.abs(
      (stockData_DAY[0].c - stockData_DAY[stockData_DAY.length - 1].c) /
        stockData_DAY[0].c
    ) * 100;

  console.log(percentual_difference_DAY);

  console.log(stockData_DAY[0].c > stockData_DAY[stockData_DAY.length - 1].c);

  console.log(stockData_DAY[0].c);
  console.log(stockData_DAY[stockData_DAY.length - 1].c);

  console.log(stockData_DAY);
  console.log(stockData_WHOLE_DAY);

  stockInformation = await AlpacaData.getSingleStock(props.symbol);

  stockNews = await AlpacaData.getSingleNewsArticle(props.symbol);

  setCurrentStockRelatedDate();

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

.negative-percentage {
  color: red;
}

.positive-percentage {
  color: green;
}
</style>
