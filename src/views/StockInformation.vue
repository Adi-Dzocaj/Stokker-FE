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

const data = {
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
      data: [40, 39, 10, 40, 39, 80, 50, 60, 70, 80, 90, 100],
    },
  ],
};

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
    "2023-01-10T0:00:00Z",
    "2023-01-10T20:00:00Z",
    "1Day"
  );

  stockInformation = await AlpacaData.getSingleStock(props.symbol);

  stockNews = await AlpacaData.getSingleNewsArticle(props.symbol);

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
