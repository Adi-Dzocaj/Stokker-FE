<template>
  <div class="stock-information" v-if="!loading">
    <div class="stock-name">
      <h6>
        {{ stockInformation.name }}
      </h6>
    </div>
    <div class="stock-ticker">
      <span>{{ stockInformation.symbol }}</span>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref, reactive } from "vue";
import AlpacaData from "../services/AlpacaData";

let stockData = ref([]);
let stockInformation = reactive({});
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

  console.log(props.symbol);

  loading.value = false;
});
</script>

<style scoped>
.stock-information {
  margin: 20px;
}

.stock-name {
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

.stock-ticker {
  display: flex;
  justify-content: flex-end;
  color: #808080;
}
</style>
