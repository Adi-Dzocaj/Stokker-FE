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
        <!-- </div> -->
      </div>
      <div class="login-menu-alternate-registration">
        <font-awesome-icon class="login-menu-icon" icon="fa-brands fa-google" />
        <font-awesome-icon class="login-menu-icon" icon="fa-brands fa-github" />
        <font-awesome-icon
          class="login-menu-icon"
          icon="fa-brands fa-facebook"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  padding: 10px;
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

.login-menu-alternate-registration {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 70%;
}

.login-menu-icon {
  font-size: 60px;
  /* flex-grow: 1; */
  padding: 10px;
  /* background-color: #ffe1a1; */
  border-radius: 50px;
  border: 1px solid #344d67;
}
</style>
