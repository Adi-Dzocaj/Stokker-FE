<template>
  <button :disabled="disabled" class="button">
    {{ content }}
  </button>
</template>

<script setup>
import { defineProps } from "vue";
defineProps([
  "color",
  "backgroundColor",
  "content",
  "fsize",
  "padding",
  "disabled",
]);
</script>

<style scoped>
.button {
  width: 100%;
  padding: v-bind(padding);
  background: v-bind(backgroundColor);
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  font-size: v-bind(fsize);
  font-weight: bold;
  font-style: italic;
  color: v-bind(color);
}

.button:hover {
  cursor: pointer;
}

.button:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}
</style>
