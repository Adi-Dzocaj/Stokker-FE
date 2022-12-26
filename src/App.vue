<script setup>
import Navbar from "./components/skeleton/Navbar.vue";
import FooterBar from "./components/skeleton/FooterBar.vue";
import "./globalStyles/main.css";
</script>

<template>
  <Navbar />
  <FooterBar />
  <router-view></router-view>
</template>

<style scoped></style>
