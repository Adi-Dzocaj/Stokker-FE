<template>
  <div class="article-section-content">
    <h6>
      {{ content }}
    </h6>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["content"]);
</script>

<style scoped>
.article-section-content h6 {
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
}
</style>
