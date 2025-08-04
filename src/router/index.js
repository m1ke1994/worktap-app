import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import PasswordResetPage from '../views/PasswordResetPage.vue'
import RecoverPasswordPage from '../views/RecoverPasswordPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AllWorks from '../views/AllWorks.vue'
import ProfileUsersDashbord from '../views/ProfileUsersDashbord/ProfileUsersDashbord.vue'
import CreateWork from '../components/CreateWork.vue'
import CreateWorkStep2 from '../components/CreateWorkStep2.vue'
import CreateWorkStep3 from '../components/CreateWorkStep3.vue'
import CreateWorkStep4 from '../components/CreateWorkStep4.vue'
import CreateWorks from '../components/CreateWorks.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
   { path: '/password-reset', name: 'PasswordResetPage', component: PasswordResetPage },
   { path: '/recover-password',name: 'RecoverPasswordPage', component: RecoverPasswordPage },
   { path: '/register',name: 'RegisterPage', component: RegisterPage },
   { path: '/all-works', name: 'AllWorks', component:AllWorks},
  { path: '/profile', name: 'ProfileUsersDashbord', component:ProfileUsersDashbord},
  { path: '/create-work-1', name: 'CreateWork', component:CreateWork},
   { path: '/create-work-step-2', name: 'CreateWorkStep2', component:CreateWorkStep2},
    { path: '/create-work-step-3', name: 'CreateWorkStep3', component:CreateWorkStep3},
    { path: '/create-work-step-4', name: 'CreateWorkStep4', component:CreateWorkStep4},
    { path: '/create-work', name: 'CreateWorks', component:CreateWorks},
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
