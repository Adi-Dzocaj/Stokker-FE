<script setup>
import Navbar from "./components/skeleton/Navbar.vue";
import FooterBar from "./components/skeleton/FooterBar.vue";
import "./globalStyles/main.css";
import { onMounted } from "vue";

import { useUserStore } from "../src/store/userStore/";

const userStore = useUserStore();

onMounted(() => {
  console.log("mounting..");
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
