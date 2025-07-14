<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">Добро пожаловать в WorkTap</h1>
    <p class="text-lg text-gray-600 text-center max-w-xl mb-6">
      WorkTap — это биржа для заказчиков и фрилансеров. Размещайте заказы или находите работу, которая вам по душе.
    </p>
    <router-link to="/login">
      <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Войти
      </button>
    </router-link>
  </div>
</template>

<script setup>
</script>
