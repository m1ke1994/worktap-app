<script setup>
import { ref, onMounted } from 'vue'
import CurrentWorkCard from './CurrentWorkCard.vue'

const works = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    // Можно добавить ?limit=10, если DRF поддерживает пагинацию (или срез ниже)
    const res = await fetch('http://localhost:8000/api/works/')
    if (!res.ok) throw new Error('Ошибка загрузки работ')
    let data = await res.json()
    if (Array.isArray(data)) {
      works.value = data.slice(0, 10)
    } else if (data.results) {
      // Если пагинация от DRF (results, count, etc)
      works.value = data.results
    } else {
      works.value = []
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

// Функция для генерации аватара (инициалы + фон)
function getAvatarProps(work) {
  const initials = (
    (work.owner_first_name?.[0] || "") +
    (work.owner_last_name?.[0] || "")
  ).toUpperCase()
  // Генерируем цвет из id
  let hash = 0
  const str = String(work.owner_id || "")
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = `hsl(${hash % 360}, 70%, 80%)`
  return { initials, color }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="font-bold text-3xl text-left mb-6">Актуальные ворки</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Карточки с данными -->
      <CurrentWorkCard
        v-for="work in works"
        :key="work.id"
        :work="work"
        :avatar="getAvatarProps(work)"
      />
      <!-- "Смотреть все" -->
      <div
        class="card border rounded-xl shadow-lg flex flex-col p-6 bg-[#F7F6FF] hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]"
        @click="$router.push('/works')"
      >
        <div class="flex flex-col items-center justify-center h-full gap-2">
          <p class="text-xl font-bold text-[#1DBF73] text-center">Смотреть все ворки</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#1DBF73] mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center text-gray-500 py-10">Загрузка...</div>
    <div v-if="error" class="text-center text-red-500 py-6">{{ error }}</div>
    <div v-if="!loading && works.length === 0" class="text-center text-gray-400 py-10">
      Нет опубликованных ворков
    </div>
  </div>
</template>
