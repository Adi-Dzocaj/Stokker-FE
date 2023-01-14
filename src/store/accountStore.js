import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore("account", () => {
  const accountBalance = ref({accountBalance: null})
  const unusedFunds = ref({unusedFunds: null})

    return {
        accountBalance,
        unusedFunds
    };
  });