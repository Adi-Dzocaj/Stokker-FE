<template>
  <div>StockInfo</div>
</template>

<script setup>
import { onMounted, defineProps, ref } from "vue";
import AlpacaData from "../services/AlpacaData";

let stockData = ref();
const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
});
onMounted(async () => {
  stockData = await AlpacaData.getStockInfo(
    props.symbol,
    "2023-01-10T0:00:00Z",
    "2023-01-10T20:00:00Z",
    "1Day"
  );

  console.log(stockData);

  console.log(props.symbol);
});
</script>

<style scoped></style>
