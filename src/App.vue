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
  <Navbar />
  <FooterBar />
  <router-view></router-view>
</template>

<style scoped></style>
