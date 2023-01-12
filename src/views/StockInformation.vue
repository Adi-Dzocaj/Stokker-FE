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
          : chartData_MONTH
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

const MINUTE_IN_MILLISECONDS = 60000;
const YEAR_IN_MILLISECONDS = 31556926000;
const MONTH_IN_MILLISECONDS = 2592000000;

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
let stockData_YEAR = ref([]);
let stockData_MONTH = ref([]);

const amountOfBars_MONTH = [];
const closingValueBars_MONTH = [];

let stockInformation = reactive({});
let stockNews = ref([]);
let loading = ref(true);

let areOptionButtonsDisabled = ref(false);

let userRequestedChartDataBasedOnTime = reactive([
  { title: "dayData", active: false },
  { title: "weekData", active: false },
  { title: "monthData", active: false },
  { title: "yearData", active: true },
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
  plugins: {
    legend: {
      display: false,
    },
  },
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

  console.log(stockData_MONTH);

  stockData_MONTH.data.bars.forEach((bar) => {
    amountOfBars_MONTH.push("");
    closingValueBars_MONTH.push(bar.c);
  });

  console.log(closingValueBars_MONTH);
  console.log(amountOfBars_MONTH);
  console.log([
    stockData_YEAR.data.bars[0].c,
    stockData_YEAR.data.bars[1].c,
    stockData_YEAR.data.bars[2].c,
    stockData_YEAR.data.bars[3].c,
    stockData_YEAR.data.bars[4].c,
    stockData_YEAR.data.bars[5].c,
    stockData_YEAR.data.bars[6].c,
    stockData_YEAR.data.bars[7].c,
    stockData_YEAR.data.bars[8].c,
    stockData_YEAR.data.bars[9].c,
    stockData_YEAR.data.bars[10].c,
    stockData_YEAR.data.bars[11].c,
  ]);
  stockInformation = await AlpacaData.getSingleStock(props.symbol);

  stockNews = await AlpacaData.getSingleNewsArticle(props.symbol);

  chartData_YEAR = {
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        backgroundColor: "#344d67",
        data: [
          stockData_YEAR.data.bars[0].c,
          stockData_YEAR.data.bars[1].c,
          stockData_YEAR.data.bars[2].c,
          stockData_YEAR.data.bars[3].c,
          stockData_YEAR.data.bars[4].c,
          stockData_YEAR.data.bars[5].c,
          stockData_YEAR.data.bars[6].c,
          stockData_YEAR.data.bars[7].c,
          stockData_YEAR.data.bars[8].c,
          stockData_YEAR.data.bars[9].c,
          stockData_YEAR.data.bars[10].c,
          stockData_YEAR.data.bars[11].c,
        ],
      },
    ],
  };

  chartData_MONTH = {
    labels: amountOfBars_MONTH,
    datasets: [
      {
        backgroundColor: "#344d67",
        data: closingValueBars_MONTH,
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
  gap: 20px;
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
</style>
