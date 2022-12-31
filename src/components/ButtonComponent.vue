<script setup>
import { defineProps } from "vue";
defineProps(["color", "content", "location", "fsize", "padding"]);
</script>

<template>
  <router-link class="button" :to="location">
    {{ content }}
  </router-link>
</template>

<style scoped>
.button {
  width: 100%;
  padding: v-bind(padding);
  background: v-bind(color);
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  font-size: v-bind(fsize);
  font-weight: bold;
  font-style: italic;
}
</style>
