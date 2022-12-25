<template>
  <div class="nav-container">
    <router-link class="header-logo" to="#">Stokker</router-link>
    <NavMenu />
  </div>
</template>

<script setup>
import NavMenu from "../NavMenu.vue";
</script>

<style scoped>
.nav-container {
  min-height: 70px;
  width: 100%;
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
