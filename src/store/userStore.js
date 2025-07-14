import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    userData: null
  }),
  actions: {
    login(user) {
      this.userData = user
      this.isAuthenticated = true
    },
    logout() {
      this.userData = null
      this.isAuthenticated = false
    }
  }
})
