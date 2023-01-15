<template>
  <div class="investment-container">
    <div class="investment-header">
      <h5>{{ title }}</h5>
      <h6>{{ symbol }}</h6>
    </div>

    <div class="data-piece">
      <h6>Bought at: {{ buyPrice }} $</h6>
    </div>

    <div class="data-piece">
      <h6>Amount: {{ currentPrice }}</h6>
    </div>

    <div class="data-piece">
      <h6>Change: {{ percentualIncrease }}</h6>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps([
  "title",
  "symbol",
  "buyPrice",
  "currentPrice",
  "percentualIncrease",
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

.data-piece {
  display: flex;
  flex-direction: column;
  padding: 4px;
}
</style>
