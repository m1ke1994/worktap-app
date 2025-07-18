import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import AOS from 'aos'
import { createPinia } from 'pinia'
import router from './router'
import 'aos/dist/aos.css'

// 1. Создаём app
const app = createApp(App)

// 2. Подключаем Pinia (важно до userStore!)
const pinia = createPinia()
app.use(pinia)

// 3. Теперь можно вызывать store
import { useUserStore } from './store/userStore'
const userStore = useUserStore()
userStore.fetchProfile()

// 4. Всё остальное
app.use(router)

// 5. Инициализация AOS
app.config.globalProperties.AOS = AOS.init({
  duration: 800,
  easing: 'ease-in-out-quad',
  once: true
})

app.mount('#app')
