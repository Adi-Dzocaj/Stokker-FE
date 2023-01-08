<template>
  <div class="register-container">
    <div class="register-menu">
      <div class="register-menu-header">
        <h4>Register an account</h4>
      </div>
      <div class="register-menu-content">
        <div class="register-menu-input">
          <label for="text">Email</label>
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="register-menu-input">
          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button class="register-button" @click="register">Register</button>
      </div>
      <font-awesome-icon
        @click="authenticateWithGoogleAccount"
        class="register-menu-icon"
        icon="fa-brands fa-google"
      />
    </div>
  </div>
</template>

<script setup>
import ApiData from "../services/ApiData";
import { useRouter } from "vue-router";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    );
    console.log("Registered");
    console.log(getAuth().currentUser.uid, getAuth().currentUser.email);

    const userUid = getAuth().currentUser.uid;
    await ApiData.postUser({
      id: userUid,
      email: getAuth().currentUser.email,
    });

    // await ApiData.getUsers();
    toast.success("Registration complete!");
    router.push("/dashboard");
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      toast.error("Email format is not accepted");
    } else if (error.code === "auth/weak-password") {
      toast.error("Password is not accepted");
    }
    return;
  }
};

const authenticateWithGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(getAuth(), provider);
    console.log("Registered with Google");
    console.log(getAuth());
    console.log(getAuth().currentUser.uid);
    console.log(getAuth().currentUser.email);
    await ApiData.postUser({
      id: getAuth().currentUser.uid,
      email: getAuth().currentUser.email,
    });
    toast.success("Google registration complete!");
    router.push("/dashboard");
  } catch (error) {
    console.log(error.code);
    alert(error.message);
  }
};
</script>

<style scoped>
.register-container {
  /* Header is 10vh, footer is 20vh */
  height: calc(100vh - 10vh - 20vh);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-menu {
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

.register-menu-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
}

.register-menu-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 70%;
  margin: 10px;
}

.register-menu-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.register-menu-input input {
  width: 100%;
  border: 1px solid #344d67;
  padding: 4px;
}

.register-menu-content input::placeholder {
  color: #344d67;
}

.register-button {
  background-color: #344d67;
  border-radius: 4px;
  color: white;
  padding: 5px;
}

.register-menu-icon {
  font-size: 60px;
  padding: 10px;
  color: #344d67;
}

/* Desktop Styling */
.register-menu-icon:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
