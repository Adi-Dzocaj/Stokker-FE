import { defineStore } from "pinia";
import { ref } from "vue";
import ApiData from "../services/ApiData";
import { getAuth } from "firebase/auth";

export const useAccountStore = defineStore("account", () => {
  const accountBalance = ref({accountBalance: null})
  const unusedFunds = ref({unusedFunds: null})
  const investments = ref()

  const getUserAccountAndSetInvestments = async () => {
    const response = await ApiData.getSpecificAccountInvestments(getAuth().currentUser.uid);
    investments.value = response
  }
    return {
        accountBalance,
        unusedFunds,
        investments,
        getUserAccountAndSetInvestments
    };
  });