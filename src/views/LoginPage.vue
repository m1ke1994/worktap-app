<template>
  <div class="container flex min-h-screen">
    <!-- Левая часть: форма входа -->
    <div class="login-box w-1/2 flex items-center justify-center p-10">
      <div class="form-wrapper w-full max-w-md space-y-6">
        <div>
          <h1 class="text-3xl font-bold">Добро пожаловать!</h1>
          <h2 class="mt-2 text-lg text-gray-700">Войдите в свой аккаунт</h2>
        </div>
        <form @submit.prevent="onLogin" class="space-y-4">
          <label class="block text-gray-600">
            E-mail
            <input
              v-model="email"
              type="email"
              placeholder="E-mail"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
            />
          </label>
          <label class="block text-gray-600">
            Пароль
            <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
            />
          </label>
          <div class="options flex items-center justify-between">
            <label class="flex items-center text-gray-600">
              <input
                v-model="remember"
                type="checkbox"
                class="mr-2"
              />
              Запомнить меня
            </label>
            <button
              type="button"
              @click="onForgot"
              class="text-sm text-orange-500 underline"
            >
              Забыли пароль?
            </button>
          </div>
          <button
            type="submit"
            class="btn-primary w-full py-3 rounded-full bg-green-500 text-white text-center"
          >
            Войти
          </button>
        </form>
        <button
          @click="onGoogleLogin"
          class="btn-google w-full py-3 rounded-full bg-gray-800 text-white flex items-center justify-center"
        >
          <img src="../assets/google-icon.svg" alt="Google" class="w-5 h-5 mr-2" />
          Или войдите с помощью Google
        </button>
        <p class="text-center text-gray-600">
          У вас все еще нет аккаунта? 
          <a href="#" class="text-orange-500 underline">Зарегистрируйтесь бесплатно!</a>
        </p>
      </div>
    </div>

    <!-- Правая часть: изображение с оверлеем -->
    <div
      class="image-box w-1/2 relative bg-cover bg-center"
      :style="{ backgroundImage: `url('/src/assets/bg-login.png')` }"
    >
      <div class="overlay absolute bottom-10 left-10 right-10 bg-white bg-opacity-90 rounded-lg p-4">
        <img src="/src/assets/bg-login.png" alt="" class="hidden" />
        <p class="text-gray-800 text-sm">
          Worktap — это маркетплейс фриланс услуг, где можно купить услугу как товар в магазине или создать индивидуальный заказ на бирже.
        </p>
        <div class="dots flex justify-center mt-3">
          <span class="dot w-2 h-2 bg-yellow-400 rounded-full mx-1 opacity-50"></span>
          <span class="dot-active w-2 h-2 bg-yellow-400 rounded-full mx-1"></span>
          <span class="dot w-2 h-2 bg-yellow-400 rounded-full mx-1 opacity-50"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)

function onLogin() {
  // TODO: реализовать логику входа
  console.log('Login', { email: email.value, password: password.value, remember: remember.value })
}

function onGoogleLogin() {
  // TODO: интеграция с Google OAuth
  console.log('Google login')
}

function onForgot() {
  // TODO: перенаправить на страницу восстановления пароля
  console.log('Forgot password')
}
</script>
