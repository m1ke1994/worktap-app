import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import AOS from 'aos'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // ← подключаем Pinia
app.use(router)

import 'aos/dist/aos.css' // Не забудьте импортировать CSS


// Инициализация AOS
app.config.globalProperties.AOS = AOS.init({
  // Опциональные настройки
  duration: 800,
  easing: 'ease-in-out-quad',
  once: true
})
app.mount('#app')
