<template>
  <div class="loading-container" v-if="userStore.loading">
    <div><LoadingSpinner /></div>
  </div>
  <div class="app" v-else>
    <Navbar />
    <router-view class="router-view"></router-view>
    <FooterBar />
  </div>
</template>

<script setup>
import Navbar from "./components/skeleton/Navbar.vue";
import FooterBar from "./components/skeleton/FooterBar.vue";
import "./globalStyles/main.css";
import { onMounted, ref } from "vue";
import { useGlobalStore } from "./store/globalStore";

import { useUserStore } from "../src/store/userStore/";

import ALPACA_API from "../src/services/AlpacaData";
import LoadingSpinner from "../src/components/LoadingSpinner.vue";

const globalStore = useGlobalStore();
const userStore = useUserStore();

onMounted(async () => {
  console.log("mounting..");
  globalStore.alpacaNewsData = await ALPACA_API.getNewsArticles();
  userStore.loadUser();
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
}

.router-view {
  min-height: calc(100vh - 10vh - 20vh);
}

.loading-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
