import { defineStore } from "pinia";
import { useUserStore } from '../store/userStore'
import { computed } from 'vue';

export const useGlobalContext = defineStore("global", () => {
    const setLocationProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "/" : "/login";
      })
      const setContentProp = computed(() => {
        const userStore = useUserStore();
        return userStore.user ? "Log out" : "Log in";
      });
    return {
        setLocationProp,
        setContentProp,
    };
  });