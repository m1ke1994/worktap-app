<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* Поля формы */
const password_one = ref('')
const password_second  = ref('')


/* Слайды справа (как было) */
const slides = [
  'Worktap — ваш надёжный путь к быстрым и качественным фриланс‑услугам.',
  'Тысячи проверенных специалистов готовы взяться за ваш проект прямо сейчас.',
  'Получите результат быстрее: опишите задачу, выберите исполнителя — и всё готово!'
]
const currentIndex = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Левая колонка: восстановление пароля -->
    <div class="w-1/2 flex flex-col px-10 lg:px-20 m-auto items-center justify-center">
      <!-- Логотип -->
     

      <!-- Тексты -->
      <p class="text-gray-600">Давайте восстановим Вам пароль</p>
      <h1 class="mt-2 mb-8 text-2xl font-semibold">
       Придумайте новый пароль
      </h1>

      <!-- Форма -->
      <form  class="space-y-5 max-w-sm">
        <label class="block text-gray-600">
          Пароль
          <input v-model="password_one"
                 type="password"
                 placeholder="Пароль"
                 required
                 class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"/>
        </label>

        <label class="block text-gray-600">
          Повторите пароль
          <input v-model="password_second"
                 type="password"
                 placeholder="Пароль"
                 required
                 class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"/>
        </label>

        <button type="text"
                class="w-full py-3 rounded-full bg-green-500 text-white font-medium">
         Изменить пароль
        </button>
      </form>

      <!-- Ссылка «Вспомнили пароль?» -->
      <p class="mt-8 text-center text-gray-600">
        Вспомнили пароль?
        <router-link to="/login"
           class="text-orange-500 hover:underline transition-all duration-300 ml-1">
          Войдите
        </router-link>
      </p>
    </div>

    <!-- Правая колонка (без изменений) -->
    <div class="w-1/2 relative bg-cover bg-center"
         :style="{ backgroundImage: `url('/assets/bg-login3.png')` }">
      <div
        class="absolute bottom-10 left-10 right-10 bg-white/90 rounded-lg p-4 backdrop-blur">
        <p class="text-sm text-gray-800 transition-all duration-300">
          {{ slides[currentIndex] }}
        </p>
        <div class="flex justify-center mt-3">
          <span v-for="(_, idx) in slides"
                :key="idx"
                class="mx-1 w-2 h-2 rounded-full bg-yellow-400"
                :class="{ 'opacity-100': idx === currentIndex,
                          'opacity-50' : idx !== currentIndex }"/>
        </div>
      </div>
    </div>
  </div>
</template>
