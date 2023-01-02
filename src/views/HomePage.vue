<template>
  <div class="homepage">
    <div class="hero-image">
      <div class="hero-content">
        <h4>The ultimate trading platform for beginners</h4>
        <div class="hero-button" v-if="!userStore.user">
          <ButtonComponent
            color="#FFE1A1"
            location="/register"
            content="Register an account and start paper trading today"
            fsize="12px"
            padding="10px"
          />
        </div>
      </div>
    </div>
    <div class="homepage-content" v-if="globalStore.alpacaNewsData">
      <div class="article-section-container">
        <div class="article-section-header">
          <h4>Stock News</h4>
        </div>
        <div
          v-for="article in toRaw(globalStore.alpacaNewsData.news)"
          :key="article.summary"
        >
          <ArticleComponent
            :content="article.headline"
            :location="article.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "../components/ButtonComponent.vue";
import { useUserStore } from "../store/userStore";
import { useGlobalStore } from "../store/globalStore";
import ArticleComponent from "../components/ArticleComponent.vue";
import { toRaw } from "vue";

const globalStore = useGlobalStore();
const userStore = useUserStore();

console.log(toRaw(globalStore.alpacaNewsData));
</script>

<style scoped>
.hero-image {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/hero-img.jpg");
}

.hero-content {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.hero-button {
  opacity: 0.9;
}
.hero-button:hover {
  opacity: 1;
}

.homepage-content {
  margin: 20px;
}

.article-section-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-section-header h4 {
  display: inline;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
}

@media (min-width: 768px) {
  .hero-content {
    font-size: 20px;
  }
}
</style>
