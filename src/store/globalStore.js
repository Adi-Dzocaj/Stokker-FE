import { defineStore } from "pinia";
import { useUserStore } from './userStore'
import { computed, ref } from 'vue';
import ApiData from "../services/ApiData";
import AlpacaData from "../services/AlpacaData";
import { getAuth } from "firebase/auth";

export const useGlobalStore = defineStore("global", () => {
  const alpacaNewsData = null;
  const showModal = ref(false)

    const setLocationProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "/" : "/login";
      })
      const setContentProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "Log out" : "Log in";
      });

      const setCurrentPricesUpdateAccount = async () => {
        let listOfInvestments = await ApiData.getSpecificAccountInvestments(
          getAuth().currentUser.uid
        );
        listOfInvestments.forEach(async (investment) => {
          investment.currentPrice = await AlpacaData.getLatestStockInfo(investment.stockTicker);
          await ApiData.updateInvestment(investment.id, {currentPrice: investment.currentPrice})
          console.log(investment.currentPrice)
        })
      }

    return {
        alpacaNewsData,
        setLocationProp,
        setContentProp,
        showModal,
        setCurrentPricesUpdateAccount
    };
  });