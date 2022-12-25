<template>
  <div class="nav-container">
    <Hamburger />
    <router-link class="header-logo" to="#">Stokker</router-link>
    <span>+</span>
  </div>
</template>

<script setup>
import Hamburger from "../Hamburger.vue";
</script>

<style scoped>
.nav-container {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #344d67;
  color: white;
}

.header-logo {
  font-style: italic;
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;
  color: white;
}
</style>
