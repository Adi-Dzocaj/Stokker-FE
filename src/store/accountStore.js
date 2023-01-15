import { defineStore } from "pinia";
import { ref } from "vue";
import ApiData from "../services/ApiData";
import { getAuth } from "firebase/auth";

export const useAccountStore = defineStore("account", () => {
  const accountBalance = ref({accountBalance: null})
  const unusedFunds = ref({unusedFunds: null})
  const investments = ref()

  const getUserAccountAndSetInvestments = async () => {
    const response = await ApiData.getSpecificAccount(getAuth().currentUser.uid);
    console.log(response.data.investments)
    investments.value = response.data.investments
    console.log(investments.value)
  }
    return {
        accountBalance,
        unusedFunds,
        investments,
        getUserAccountAndSetInvestments
    };
  });