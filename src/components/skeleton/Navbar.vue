<template>
  <div class="nav-container">
    <div class="nav-menu">
      <router-link @click="closeMenu()" to="/dashboard" class="nav-item">
        <span class="nav-link">Dashboard</span>
      </router-link>
      <router-link @click="closeMenu()" to="/stockpanel" class="nav-item">
        <span class="nav-link">Stockpanel</span>
      </router-link>
      <router-link @click="closeMenu()" to="/investments" class="nav-item">
        <span class="nav-link">Investments</span>
      </router-link>
    </div>
    <div class="hamburger" @click="toggleMenuActivation()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <router-link class="header-logo" to="/">Stokker</router-link>
    <!-- <font-awesome-icon class="profile-icon" icon="fa-solid fa-user-tie" /> -->
    <div class="profile-icon">
      <div class="profile-icon-inner">
        <ButtonComponent
          :action="handleConditionalSignOut"
          color="#FFE1A1"
          :location="globalStore.setLocationProp"
          :content="globalStore.setContentProp"
          fsize="12px"
          padding="10px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ButtonComponent from "../ButtonComponent.vue";
import { useUserStore } from "../../store/userStore";
import { useGlobalStore } from "../../store/globalStore";

import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const globalStore = useGlobalStore();

const hamburger = document.getElementsByClassName("hamburger");
const navMenu = document.getElementsByClassName("nav-menu");

const handleConditionalSignOut = () => {
  if (userStore.user) {
    userStore.handleSignOut();
    router.push("/");
  } else {
    return;
  }
};

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

const closeMenu = () => {
  hamburger[0].classList.remove("active");
  navMenu[0].classList.remove("active");
};
</script>

<style scoped>
.nav-container {
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #344d67;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  width: 33%;
}

.profile-icon-inner {
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 100000000;
}

.nav-link {
  transition: 0.7s ease;
  font-size: 24px;
  color: black;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  background-color: #ffe1a1;
}

.hamburger {
  display: block;
  cursor: pointer;
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
  top: 10vh;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffe1a1;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  padding: 30px;
}

.nav-item {
  background-color: #ffe1a1;
  border-bottom: 1px solid black;
}

.nav-item:hover {
  opacity: 0.8;
}

.nav-menu.active {
  left: 0;
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .nav-menu {
    flex-direction: row;
    position: initial;
    width: 33%;
    padding: initial;
    border-top: initial;
    background-color: #344d67;
  }

  .nav-link {
    color: #ffe1a1;
    font-size: 16px;
    background-color: #344d67;
  }

  .nav-item {
    border-bottom: none;
  }
}

@media (min-width: 768px) {
  .nav-link {
    font-size: 20px;
  }
}
</style>
