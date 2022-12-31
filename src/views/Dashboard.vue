<template>
  <div>Dashboard</div>
  <button @click="handleSignOut">sign out</button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = async () => {
  await signOut(auth);
  router.push("/");
};
</script>

<style scoped></style>
