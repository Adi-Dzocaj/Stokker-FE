<script setup>
import Navbar from "./components/skeleton/Navbar.vue";
import FooterBar from "./components/skeleton/FooterBar.vue";
import "./globalStyles/main.css";
import { onMounted } from "vue";
import { useGlobalStore } from "./store/globalStore";

import { useUserStore } from "../src/store/userStore/";

import ALPACA_API from "../src/services/AlpacaData";

const globalStore = useGlobalStore();
const userStore = useUserStore();

onMounted(async () => {
  console.log("mounting..");
  console.log(globalStore.alpacaNewsData);
  globalStore.alpacaNewsData = await ALPACA_API.getNewsArticles();
  console.log(globalStore.alpacaNewsData);
  userStore.loadUser();
});
</script>

<template>
  <div v-if="userStore.loading">
    <p>Loading...</p>
  </div>
  <div class="app" v-else>
    <Navbar />
    <router-view class="router-view"></router-view>
    <FooterBar />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
}

.router-view {
  min-height: calc(100vh - 10vh - 20vh);
}
</style>
