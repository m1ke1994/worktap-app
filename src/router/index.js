import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import PasswordResetPage from '../views/PasswordResetPage.vue'
import RecoverPasswordPage from '../views/RecoverPasswordPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
   { path: '/password-reset', name: 'PasswordResetPage', component: PasswordResetPage },
   { path: '/recover-password',name: 'RecoverPasswordPage', component: RecoverPasswordPage },
   { path: '/register',name: 'RegisterPage', component: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
