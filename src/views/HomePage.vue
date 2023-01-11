<template>
  <div>
    <div class="hero-image">
      <div class="hero-content">
        <h4>The ultimate trading platform for beginners</h4>
        <div class="hero-button" v-if="!userStore.user">
          <ButtonComponent
            color="#FFE1A1"
            location="/register"
            content="Register a free account and start paper trading today"
            fsize="12px"
            padding="10px"
          />
        </div>
      </div>
    </div>
    <div class="homepage-content" v-if="globalStore.alpacaNewsData">
      <div class="article-section-container">
        <ArticleSectionHeaderComponent />
        <div
          v-for="article in toRaw(globalStore.alpacaNewsData.news)"
          :key="article.id"
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
import ArticleSectionHeaderComponent from "../components/ArticleSectionHeaderComponent.vue";

const globalStore = useGlobalStore();
const userStore = useUserStore();

console.log(toRaw(globalStore.alpacaNewsData));
</script>

<style scoped>
.hero-image::before {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/hero-img.jpg");
  height: 200px;
  width: 100%;
  position: absolute;
  content: "";
  opacity: 0.9;
}
.hero-image {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.hero-content {
  z-index: 10;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.homepage-content {
  margin: 20px;
}

.article-section-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .hero-content {
    font-size: 20px;
  }
}
</style>
