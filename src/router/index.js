import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import PasswordResetPage from '../views/PasswordResetPage.vue'
import RecoverPasswordPage from '../views/RecoverPasswordPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AllWorks from '../views/AllWorks.vue'
import ProfileUsersDashbord from '../views/ProfileUsersDashbord/ProfileUsersDashbord.vue'
import CreateWorks from '../components/CreateWorks.vue'
import CreateJob from '../components/CreateJob.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/password-reset', name: 'PasswordResetPage', component: PasswordResetPage },
  { path: '/recover-password', name: 'RecoverPasswordPage', component: RecoverPasswordPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/all-works', name: 'AllWorks', component: AllWorks },
  { path: '/profile', name: 'ProfileUsersDashbord', component: ProfileUsersDashbord },
  {
    path: '/create-work',
    name: 'CreateWorks',
    component: CreateWorks,
    meta: { requiresAuth: true }   // --- < добавил защиту!
  },
  {
    path: '/create-job',
    name: 'CreateJob',
    component: CreateJob,
    
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- ГЛОБАЛЬНАЯ ЗАЩИТА ДЛЯ РОУТОВ ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})


export default router
