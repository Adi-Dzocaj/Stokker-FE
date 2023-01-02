<template>
  <div class="hero-image" v-if="globalStore.alpacaNewsData">
    <div class="hero-content">
      <h4>The ultimate trading platform for beginners</h4>
      <div class="hero-button" v-if="!userStore.user">
        <ButtonComponent
          color="#FFE1A1"
          location="/register"
          content="Register an account and start paper trading today"
          fsize="12px"
          padding="10px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "../components/ButtonComponent.vue";
import { useUserStore } from "../store/userStore";
import { useGlobalStore } from "../store/globalStore";
const globalStore = useGlobalStore();
const userStore = useUserStore();
</script>

<style scoped>
.hero-image {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/hero-img.jpg");
}

.hero-content {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.hero-button {
  opacity: 0.9;
}
.hero-button:hover {
  opacity: 1;
}

@media (min-width: 768px) {
  .hero-content {
    font-size: 20px;
  }
}
</style>
