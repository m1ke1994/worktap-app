<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-gray-100 p-8 rounded shadow">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Вход в WorkTap</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" v-model="email" type="email" required
                 class="mt-1 block w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <input id="password" v-model="password" type="password" required
                 class="mt-1 block w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

function handleLogin() {
  // Простая фейковая логика
  if (email.value && password.value) {
    userStore.login({ name: email.value })
    router.push('/')
  } else {
    alert('Введите email и пароль')
  }
}
</script>
