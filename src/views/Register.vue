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
        <div class="register-menu-actions">
          <button @click="register">Register</button>
        </div>
      </div>
      <div class="register-menu-alternate-registration">
        <font-awesome-icon
          class="register-menu-icon"
          icon="fa-brands fa-google"
        />
        <font-awesome-icon
          class="register-menu-icon"
          icon="fa-brands fa-github"
        />
        <font-awesome-icon
          class="register-menu-icon"
          icon="fa-brands fa-facebook"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  padding: 10px;
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

.register-menu-actions button {
  width: 100%;
  background-color: #344d67;
  border-radius: 4px;
  color: white;
}

.register-menu-alternate-registration {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  width: 100%;
}

.register-menu-icon {
  font-size: 40px;
  flex-grow: 1;
}
</style>
