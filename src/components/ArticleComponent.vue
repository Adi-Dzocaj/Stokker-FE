<template>
  <div class="article-section-content">
    <a class="article-link" :href="location">
      <h6>
        {{ content }}
      </h6>
    </a>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["content", "location"]);
</script>

<style scoped>
.article-section-content h6 {
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
}

.article-link {
  color: black;
  text-decoration: none;
}

.article-link:hover {
  opacity: 0.7;
}

.article-link:visited {
  color: #dc8d8d;
}
</style>
