import { defineStore } from "pinia";
import { useUserStore } from './userStore'
import { computed } from 'vue';

export const useGlobalStore = defineStore("global", () => {
  const alpacaNewsData = null;

    const setLocationProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "/" : "/login";
      })
      const setContentProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "Log out" : "Log in";
      });

    return {
        alpacaNewsData,
        setLocationProp,
        setContentProp,
    };
  });