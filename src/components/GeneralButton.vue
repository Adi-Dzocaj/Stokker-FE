<template>
  <div class="button">
    {{ content }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["color", "backgroundColor", "content", "fsize", "padding"]);
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
</style>
