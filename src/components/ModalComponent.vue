<template>
  <div class="modal-container">
    <div class="modal">
      <h5>Choose your starting cash</h5>
      <div class="modal-content">
        <div class="instructions">
          <!-- <p>Write the amount of cash you want to start trading with</p> -->
          <p class="muted-text">Example: 10.000 ( ten thousand )</p>
          <div class="input">
            <input type="text" />
            <span>$</span>
          </div>
          <p class="muted-text">This amount can be changed later on</p>
        </div>
        <div class="modalButton" @click="$emit('close-modal')">
          <GeneralButton
            :content="buttonContent"
            color="#ffe1a1"
            backgroundColor="#344d67"
            fsize="12px"
            padding="10px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GeneralButton from "../components/GeneralButton.vue";
import { defineProps } from "vue";
defineProps(["buttonContent"]);
</script>

<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000071;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  background-color: white;
  width: 300px;
  padding: 10px;
  padding-bottom: 40px;
  padding-top: 40px;
  border: 3px solid #344d67;
  border-radius: 10px;
}

.modal h5 {
  text-align: center;
  margin-bottom: 30px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 100%;
}

.modal-content p {
  font-size: 12px;
}

.instructions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  display: flex;
  gap: 10px;
}

.muted-text {
  color: #808080;
}

.modalButton:hover {
  cursor: pointer;
}
</style>
