<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const freelancers = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/accounts/users/top-executors/')
    freelancers.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке топ фрилансеров:', error)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="font-bold text-3xl text-left mb-10">Топ фрилансеров</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ✅ ПРАВИЛЬНЫЙ ЦИКЛ -->
      <div
        v-for="freelancer in freelancers"
        :key="freelancer.id"
        class="freelancers-card bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[250px]"
      >
        <div class="flex justify-between gap-4">
          <div class="left relative w-24 h-24 flex-shrink-0">
            <img
              :src="freelancer.avatar ? freelancer.avatar : '/assets/profile.jpg'"
              alt="Фото фрилансера"
              class="w-full h-full object-cover rounded-lg"
            />
            <img
              class="absolute -top-0 -right-0 w-4 h-4"
              :src="'/assets/online.svg'"
              alt="online"
            />
          </div>

          <div class="right flex flex-col justify-between flex-grow">
            <div>
              <h3 class="font-bold text-lg">{{ freelancer.first_name }} {{ freelancer.last_name }}</h3>
              <p class="text-[#FBA457] text-sm">{{ freelancer.specialty || 'Не указано' }}</p>
            </div>

            <div class="space-y-1">
              <p class="text-sm">
                Выполнено проектов:
                <span class="text-[#1DBF73] font-bold">{{ freelancer.completed_projects }}</span>
              </p>
              <p class="text-sm">
                Рейтинг:
                <span class="text-[#1DBF73] font-bold">{{ Number(freelancer.rating).toFixed(1) }}</span>
              </p>
            </div>
          </div>
        </div>

        <button
          class="mt-4 font-bold w-full text-[#1DBF73] border-2 border-[#1DBF73] rounded-2xl px-4 py-2 hover:bg-[#1DBF73] hover:text-white transition-all duration-300"
        >
          Написать
        </button>
      </div>

      <!-- Кнопка "Посмотреть всех" -->
      <router-link to="/executors">
        <div
          class="card border rounded-xl shadow-lg flex flex-col p-6 bg-[#F7F6FF] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[250px]"
        >
          <div class="flex flex-col items-center justify-center h-full gap-2">
            <p class="text-xl font-bold text-[#1DBF73] text-center">
              Посмотреть всех ТОП фрилансеров
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#1DBF73] mt-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Если нужно — можно добавить стили */
</style>
