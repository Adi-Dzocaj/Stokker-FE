<template>
  <div class="home-page-container">
    <div class="hero-image">
      <div class="hero-content">
        <h4>Paper trading platform for beginners</h4>
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
      <div class="paper-trading-explanation-container">
        <div class="paper-trading-explanation">
          <h4>Paper trading</h4>
          <p>
            Have you ever wondered how well you'd fare in the stock market? If
            so, you've ended up in the right place.
          </p>
          <p>
            Stokker is designed to lower the barrier-to-entry for investing in
            stocks and gives you the freedom to experiment in the US stock
            market and see if your intuitions are correct.
          </p>
          <p>
            We also provide real time stock related news, so that you stay up to
            date, and can make educated decisions.
          </p>
          <p>The platform is completely free of charge to use.</p>
          <p>Good luck!</p>
        </div>
      </div>
      <h4 class="instructions-header">Instructions</h4>
      <div class="homepage-instructions">
        <div class="instructions-box">
          <h4>Register an account</h4>
        </div>
        <font-awesome-icon class="arrow-down" icon="fa-solid fa-arrow-down" />
        <font-awesome-icon class="arrow-right" icon="fa-solid fa-arrow-right" />
        <div class="instructions-box">
          <h4>Pick your starting capital</h4>
        </div>
        <font-awesome-icon class="arrow-down" icon="fa-solid fa-arrow-down" />
        <!-- <font-awesome-icon class="arrow-right" icon="fa-solid fa-arrow-right" /> -->
        <div class="instructions-box">
          <h4>Find a stock</h4>
        </div>
        <font-awesome-icon class="arrow-down" icon="fa-solid fa-arrow-down" />
        <font-awesome-icon class="arrow-right" icon="fa-solid fa-arrow-right" />
        <div class="instructions-box">
          <h4>Invest</h4>
        </div>
      </div>

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

.homepage-instructions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.instructions-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 3px solid #344d67;
  border-radius: 4px;
  background-color: #d3e785;
}

.arrow-right {
  display: none;
  color: #344d67;
}

.arrow-down {
  color: #344d67;
}

.paper-trading-explanation-container {
  padding: 30px;
  border: 3px solid #344d67;
  border-radius: 4px;
  margin-bottom: 20px;
}

.paper-trading-explanation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.instructions-header {
  display: inline;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
}

@media (min-width: 768px) {
  .hero-content {
    font-size: 20px;
  }
  .homepage-instructions {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .instructions-box {
    width: 40%;
  }

  .arrow-down {
    display: none;
  }

  .arrow-right {
    display: block;
  }

  .paper-trading-explanation {
    width: 90%;
  }

  .instructions-header {
    display: none;
  }
  .paper-trading-explanation-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (min-width: 1024px) {
  .hero-image::before {
    height: 400px;
  }
  .hero-image {
    height: 400px;
  }
  .hero-content {
    font-size: 30px;
  }
  .instructions-box {
    flex-grow: 1;
  }
  .instructions-header {
    display: inline;
  }
}
</style>
