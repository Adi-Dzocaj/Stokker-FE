<template>
  <div class="login-container">
    <div class="login-menu">
      <div class="login-menu-header">
        <h4>Log in to your account</h4>
      </div>
      <div class="login-menu-content">
        <div class="login-menu-input">
          <label for="text">Email</label>
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="login-menu-input">
          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <!-- <div class="login-menu-actions"> -->
        <button class="login-button" @click="login">Log in</button>
        <router-link to="/register" class="registration-link"
          >Register an account</router-link
        >
        <!-- </div> -->
      </div>
      <font-awesome-icon
        @click="authenticateWithGoogleAccount"
        class="login-menu-icon"
        icon="fa-brands fa-google"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useToast } from "vue-toastification";

import { useRouter } from "vue-router";
const router = useRouter();

const toast = useToast();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    console.log("Logged in");
    toast.success("Logged in!");
    router.push("/");
  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/invalid-email") {
      toast.error("Incorrect email");
    } else if (error.code === "auth/user-not-found") {
      toast.error("We couldn't find that user");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password");
    } else {
      toast.error("Email or password was incorrect");
    }
  }
};

// Can be moved to separate Google Auth component
const authenticateWithGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(getAuth(), provider);
    console.log("Registered with Google");
    toast.success("Google registration complete!");
    router.push("/");
  } catch (error) {
    console.log(error.code);
    toast.warning(error.message);
  }
};
</script>

<style scoped>
.login-container {
  /* Header is 10vh, footer is 20vh */
  height: calc(100vh - 10vh - 20vh);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 90%;
  height: auto;
  border: 3px solid #344d67;
  border-radius: 1rem;
  padding: 20px;
  gap: 20px;
}

.login-menu-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
}

.login-menu-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 70%;
  margin: 10px;
}

.login-menu-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.login-menu-input input {
  width: 100%;
  border: 1px solid #344d67;
  padding: 4px;
  border-radius: 4px;
}

.login-menu-content input::placeholder {
  color: #344d67;
}

.login-button {
  background-color: #344d67;
  border-radius: 4px;
  color: white;
  padding: 5px;
}

.registration-link {
  text-align: center;
  color: #344d67;
  text-decoration: none;
}

.registration-link:hover {
  opacity: 0.8;
}

.login-menu-icon {
  font-size: 60px;
  /* padding: 10px; */
  color: #344d67;
}

/* Desktop Styling */
.login-menu-icon:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
