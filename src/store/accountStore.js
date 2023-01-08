import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
  const accountBalance = ref({accountBalance: null})

    return {
        accountBalance
    };
  });