<template>
  <div class="investment-container">
    <div class="investment-header">
      <h5>{{ title }}</h5>
      <h6>{{ symbol }}</h6>
    </div>
    <div class="investment-content">
      <div>
        <div class="data-piece">
          <h6>Bought at: {{ buyPrice }} $</h6>
        </div>

        <div class="data-piece">
          <h6>Current Price: {{ currentPrice }}</h6>
        </div>

        <div class="data-piece">
          <h6>Amount: {{ amount }}</h6>
        </div>

        <div class="data-piece">
          <h6>Total value: {{ totalValue }}</h6>
        </div>

        <div class="data-piece">
          <h6>Change: {{ percentualDifference }}</h6>
        </div>
      </div>
      <div @click="globalStore.showModal = true">
        <GeneralButton
          content="Sell stock"
          backgroundColor="#DC8D8D"
          padding="4px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import GeneralButton from "../components/GeneralButton.vue";
import { useGlobalStore } from "../store/globalStore";

const globalStore = useGlobalStore();

defineProps([
  "percentColor",
  "title",
  "amount",
  "totalValue",
  "symbol",
  "buyPrice",
  "currentPrice",
  "percentualDifference",
]);
</script>

<style scoped>
.investment-container {
  width: 100%;
  border: 2px solid #344d67;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.investment-container h5 {
  border-bottom: 1px solid lightgray;
  padding: 4px;
}

.investment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.investment-header h6 {
  color: #808080;
}

.investment-content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.data-piece {
  display: flex;
  flex-direction: column;
  padding: 4px;
}
</style>
