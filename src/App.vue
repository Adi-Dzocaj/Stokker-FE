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
  <div v-else>
    <Navbar />
    <FooterBar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
