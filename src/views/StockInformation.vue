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
    <Line :data="data" :options="options" />
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

let data = Array;

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
// ChartJS

let stockData = ref([]);
let stockInformation = reactive({});
let stockNews = ref([]);
let loading = ref(true);

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  loading.value = true;

  stockData = await AlpacaData.getStockInfo(
    props.symbol,
    "2022-01-01T0:00:00Z",
    "2023-01-01T20:00:00Z",
    "1Month"
  );

  stockInformation = await AlpacaData.getSingleStock(props.symbol);

  stockNews = await AlpacaData.getSingleNewsArticle(props.symbol);

  data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        backgroundColor: "#344d67",
        data: [
          stockData.data.bars[0].c,
          stockData.data.bars[1].c,
          stockData.data.bars[2].c,
          stockData.data.bars[3].c,
          stockData.data.bars[4].c,
          stockData.data.bars[5].c,
          stockData.data.bars[6].c,
          stockData.data.bars[7].c,
          stockData.data.bars[8].c,
          stockData.data.bars[9].c,
          stockData.data.bars[10].c,
          stockData.data.bars[11].c,
        ],
      },
    ],
  };
  console.log(stockNews);

  console.log(props.symbol);
  console.log(stockData);
  console.log(stockInformation);

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
</style>
