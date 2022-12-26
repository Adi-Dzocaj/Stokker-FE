<template>
  <div class="nav-container">
    <div class="nav-menu">
      <router-link to="#" class="nav-item">
        <span class="nav-link">Transactions</span>
      </router-link>
    </div>
    <div class="hamburger" @click="toggleMenuActivation()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <router-link class="header-logo" to="#">Stokker</router-link>
    <font-awesome-icon class="profile-icon" icon="fa-solid fa-user-tie" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const hamburger = document.getElementsByClassName("hamburger");
const navMenu = document.getElementsByClassName("nav-menu");

const count = ref(0);

const toggleMenuActivation = () => {
  if (
    hamburger[0].classList.contains("active") &&
    navMenu[0].classList.contains("active")
  ) {
    hamburger[0].classList.remove("active");
    navMenu[0].classList.remove("active");
  } else {
    hamburger[0].classList.add("active");
    navMenu[0].classList.add("active");
  }
};
</script>

<style scoped>
.nav-container {
  min-height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #344d67;
  color: white;
}

.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-weight: 600;
  font-size: 24px;
  text-decoration: underline;
  color: #ffe1a1;
  width: 33%;
}

.profile-icon {
  font-size: 30px;
  color: white;
  width: 33%;
}

a {
  color: black;
  text-decoration: none;
}

.nav-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 33%;
}

.nav-link {
  transition: 0.7s ease;
  font-size: 24px;
  color: white;
}

.nav-link:hover {
  color: #ffe1a1;
}

.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  background-color: white;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
    width: 33%;
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    gap: 0;
    display: flex;
    flex-direction: column;
    background-color: #344d67;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    padding: 30px;
    border-top: 1px solid #ffe1a1;
  }

  .nav-item {
    background-color: #344d67;
    border-bottom: 1px solid #ffe1a1;
  }

  .nav-item:hover {
    opacity: 0.8;
  }

  .nav-menu.active {
    left: 0;
  }
}
</style>
