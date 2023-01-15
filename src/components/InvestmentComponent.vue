<template>
  <div class="investment-container">
    <div class="data-piece">
      <h6>{{ title }}</h6>
    </div>

    <div class="data-piece">
      <h6>{{ symbol }}</h6>
    </div>
    <div class="data-piece">
      <h6>{{ buyPrice }}</h6>
    </div>

    <div class="data-piece">
      <h6>{{ currentPrice }}</h6>
    </div>

    <div class="data-piece">
      <h6>{{ percentualIncrease }}</h6>
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
  flex-wrap: wrap;
}

.data-piece {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  flex-grow: 1;
}

.data-piece h6 {
  border-bottom: 1px solid black;
}
</style>
