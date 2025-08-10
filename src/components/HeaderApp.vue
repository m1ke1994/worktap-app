<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const userStore = useUserStore()
const router = useRouter()
const profileModal = ref(false)

function toggleProfileModal() {
  profileModal.value = !profileModal.value
}

function logout() {
  userStore.logout()
  router.push('/')
  profileModal.value = false
}

// Универсально получаем url до аватара пользователя
const profileAvatar = computed(() => {
  const avatar = userStore.user?.avatar
  if (!avatar || avatar === "None" || avatar === null) {
    return '/assets/profile.jpg'
  }
  // Если уже абсолютный url
  if (avatar.startsWith('http')) {
    return avatar
  }
  // Если начинается с "/media" — ок!
  if (avatar.startsWith('/media')) {
    return 'http://localhost:8000' + avatar
  }
  // Если без слеша — добавим его
  return 'http://localhost:8000/media/' + avatar.replace(/^media\//, '').replace(/^\/+/, '')
})

const isAuth = computed(() => !!userStore.user)
</script>


<template>
  <header class="shadow-sm top-0 z-50 relative">
    <div class="bg-[#F7F6FF]">
      <div class="container mx-auto px-4">
        <nav class="flex justify-between items-center py-4">
          <!-- Логотип -->
          <router-link to="/" class="flex items-center">
            <img src="/assets/logo.svg" alt="Логотип" class="h-24" />
          </router-link>

          <!-- Главное меню -->
          <ul class="hidden md:flex gap-8 text-lg font-medium">
            <li class="group relative">
              <router-link
                to="/all-works"
                class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300"
              >Заказы от клиентов</router-link>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <router-link to="#" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Предложения исполнителей</router-link>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <router-link to="/create-job" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Разместить предложение</router-link>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <router-link to="/create-work"  class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Разместить заказ</router-link>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>

          <!-- Для авторизованных -->
          <div v-if="isAuth" class="flex gap-4 items-center">
            <img class="cursor-pointer hover:scale-110 transition-all duration-300" src="/assets/IconProfile/favoriteProfile.svg" alt="favorite" />
            <img class="cursor-pointer hover:scale-110 transition-all duration-300" src="/assets/IconProfile/notificationProfile.svg" alt="push" />
            <img class="cursor-pointer hover:scale-110 transition-all duration-300" src="/assets/IconProfile/chatProfile.svg" alt="chat" />

            <!-- Кнопка профиля -->
            <div class="relative">
              <ul class="flex gap-3 items-center cursor-pointer select-none" @click="toggleProfileModal">
                <li><p class="font-bold">{{ userStore.user.first_name }} {{ userStore.user.last_name }}</p></li>
                <li>
                  <img :src="profileAvatar" alt="profile" class="w-10 h-10 rounded-full object-cover border" />
                </li>
                <li
                  class="transition-transform duration-300"
                  :class="{ 'rotate-180': profileModal }"
                >
                  <img src="/assets/IconProfile/vectorprofile.svg" alt="arrow" />
                </li>
              </ul>

              <!-- Дропдаун -->
              <div
                v-if="profileModal"
                class="absolute top-full right-0 mt-2 w-full bg-[#F2F0FE] rounded-xl p-3 shadow-lg z-50"
              >
                <ul class="flex gap-3 items-center mb-3">
                  <li class="bg-[#FBA457] p-2 rounded-xl" v-if="userStore.user.role === 'customer'">Я заказчик</li>
                  <li class="bg-[#F2F0FE] p-2 rounded-xl" v-if="userStore.user.role === 'executor'">Я исполнитель</li>
                </ul>
                <ul class="flex flex-col gap-2">
                  <li class="cursor-pointer hover:text-green-500 transition-all duration-300" @click="router.push('/profile')">Мой кабинет</li>
                  <li class="cursor-pointer hover:text-green-500 transition-all duration-300">Мои заказы</li>
                  <li class="cursor-pointer hover:text-green-500 transition-all duration-300">Мои настройки</li>
                  <li class="text-red-400 cursor-pointer hover:text-red-600 transition-all duration-300" @click="logout">Выйти из аккаунта</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Для неавторизованных -->
          <div v-else class="flex gap-3">
            <router-link
              to="/register"
              class="font-bold text-[#1DBF73] border-2 border-[#1DBF73] rounded-lg px-4 py-1.5 hover:bg-[#1DBF73] hover:text-white transition-all duration-300 text-sm md:text-base md:px-6 md:py-2"
            >Регистрация</router-link>
            <router-link
              to="/login"
              class="font-bold text-[#1DBF73] border-2 border-[#1DBF73] rounded-lg px-4 py-1.5 hover:bg-[#1DBF73] hover:text-white transition-all duration-300 text-sm md:text-base md:px-6 md:py-2"
            >Войти</router-link>
          </div>
        
        </nav>
      </div>
    </div>
  </header>
</template>
