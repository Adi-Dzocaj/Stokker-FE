<template>
  <div class="register-container">
    <div class="register-menu-outer-border">
      <div class="register-menu">
        <div class="register-menu-header">
          <h4>Register an account</h4>
        </div>
        <div class="register-menu-inputs">
          <label for="text">Email</label>
          <input type="text" placeholder="Email" v-model="email" />
          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password" />
          <div class="register-menu-actions">
            <button @click="register">Register</button>
          </div>
        </div>
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

.register-menu-outer-border {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #344d67;
  width: 90%;
  height: 300px;
  border-radius: 1rem;
}

.register-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 98%;
  height: 98%;
  border-radius: 1rem;
}

.register-menu-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  height: 12%;
}

.register-menu-inputs {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 10px;
  width: 70%;
}

.register-menu-inputs input {
  width: 100%;
}

.register-menu-actions button {
  width: 100%;
  background-color: #344d67;
  border-radius: 4px;
  color: white;
}
</style>
