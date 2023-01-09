<template>
  <div>
    <v-autocomplete
      label="Find a stock"
      item-title="name"
      :menu-props="{ maxHeight: '200px' }"
      clearable
      hide-details
      hide-selected
      :items="testingList"
    >
    </v-autocomplete>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, toRaw, ref, watch } from "vue";
import AlpacaData from "../services/AlpacaData";

// let stockList = reactive([]);

// let loading = ref(Boolean);

// let stockList = [];

let testingList = [
  { name: "Apple", symbol: "aapl" },
  { name: "Microsoft" },
  { name: "OSFOS" },
  { name: "BAKOS" },
  { name: "JASO" },
];

// onBeforeMount(async () => {
//   loading.value = true;
//   //   const oneStock = await AlpacaData.getStocks();
//   //   stockList.push(oneStock);
//   stockList = await AlpacaData.getStocks();

//   //   console.log(stockList);
//   loading.value = false;
// });
</script>

<style scoped></style>
item-title="name" v-if="loading === false"
