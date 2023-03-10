import { onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';
import { getAuth, signOut } from 'firebase/auth';
import ApiData from '../services/ApiData';
import { useAccountStore } from '../store/accountStore'


export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: null,
      loading: false,
    };
  },
  actions: {
    loadUser() {
        let auth = getAuth()
        this.loading = true;
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('User has signed in')
                this.user = user
                console.log(this.user)
                this.loading = false
            } else {
                console.log('User isnt logged in / hasnt been created')
                console.log(this.user)
                this.loading = false
            }
        })
    },
    async handleSignOut() {
      let auth = getAuth()
      await signOut(auth);
      this.user = null;
      console.log(this.user);
    },
    async getUserFromDbAndSetFinancials() {
      const response = await ApiData.getSpecificUser(getAuth().currentUser.uid);
      useAccountStore().accountBalance = response.data.account.accountBalance
      useAccountStore().unusedFunds = response.data.account.unusedFunds
      useAccountStore().startingCapital = response.data.account.startingCapital
      console.log(response)
      return
    }
  },
});