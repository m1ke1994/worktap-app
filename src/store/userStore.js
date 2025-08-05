// store/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    async fetchProfile() {
      const access = localStorage.getItem('access')
      if (!access) {
        this.user = null
        return
      }
      this.loading = true
      try {
        const resp = await fetch("http://localhost:8000/api/accounts/profile/", {
          headers: { Authorization: `Bearer ${access}` }
        })
        if (resp.ok) {
          const data = await resp.json()
          this.user = data
        } else {
          // Токен просрочен/невалиден
          this.user = null
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
        }
      } catch (e) {
        this.user = null
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      } finally {
        this.loading = false
      }
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.user = null
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    }
  }
})
