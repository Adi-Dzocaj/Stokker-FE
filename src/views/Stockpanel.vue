<template>
  <div class="stock-panel">
    <div class="autocomplete-input-field">
      <input
        type="text"
        placeholder="Find a stock"
        v-model="autocompleteInput"
        autoComplete="off"
        :disabled="isInputFieldDisabled"
      />
    </div>

    <div v-if="searchStocks.length">
      <h5 class="results-display">
        Showing {{ searchStocks.length }} of
        {{ filteredStockList.length }} results
      </h5>
      <div v-for="company in searchStocks" :key="company.name">
        <ArticleComponent
          :content="company.name"
          :location="`/stockpanel/${company.symbol}`"
        >
        </ArticleComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import AlpacaData from "../services/AlpacaData";
import ArticleComponent from "../components/ArticleComponent.vue";

let autocompleteInput = ref("");

let stockList = ref([]);
let isInputFieldDisabled = ref(true);
let filteredStockList = ref([]);

onBeforeMount(async () => {
  stockList = await AlpacaData.getStocks();

  stockList.filter((company) => {
    if (company.tradable !== false) {
      filteredStockList.value.push(company);
    }
  });

  isInputFieldDisabled.value = false;
});

const searchStocks = computed(() => {
  if (autocompleteInput.value === "") {
    return [];
  }

  let results = 0;

  return filteredStockList.value.filter((company) => {
    if (
      company.name
        .toLowerCase()
        .includes(autocompleteInput.value.toLowerCase()) &&
      results < 20
    ) {
      results++;
      return company;
    }
  });
});
</script>

<style scoped>
.stock-panel {
  margin: 20px;
}

.autocomplete-input-field {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.autocomplete-input-field input {
  text-align: center;
  width: 100%;
  border: 1px solid #344d67;
  padding: 5px;
  border-radius: 4px;
}

.autocomplete-input-field input:focus {
  border: 1px solid yellow;
}

.autocomplete-input-field input:focus::placeholder {
  color: transparent;
}

.results-display {
  margin-bottom: 10px;
}
</style>
