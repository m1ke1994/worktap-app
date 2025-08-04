<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(4)

// Тут ты можешь сделать отправку данных на сервер
function publish() {
  // Пример: emit('publish'), либо API-запрос
  alert('Кворк успешно опубликован!')
}
</script>

<template>
  <div class="bg-[#f7faff] min-h-screen flex flex-col items-center py-10">
    <!-- Stepper -->
    <div class="w-[933px] bg-white border border-blue-200 rounded-xl p-3 mb-8">
      <div class="flex justify-between items-center relative">
        <div class="absolute left-10 right-10 top-1/2 h-1 bg-[#ded4f5] z-0"></div>
        <div v-for="(step, idx) in steps" :key="idx" class="flex flex-col items-center z-10 w-1/6">
          <div
            class="flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold border-4"
            :class="{
              'bg-green-500 text-white border-green-300': currentStep === idx+1,
              'bg-[#c9bbe5] text-white border-[#ded4f5]': currentStep !== idx+1,
            }"
          >{{ idx+1 }}</div>
          <span class="mt-1 text-xs font-medium text-[#6a6e8d] whitespace-nowrap">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <div class="w-[933px] bg-white rounded-xl p-8 shadow border border-gray-100 flex flex-col items-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        class="w-24 h-24 mb-6"
        alt="Готово!"
      />
      <h2 class="font-bold text-2xl mb-4 text-[#473d69] text-center">Поздравляем! <br>Вы почти опубликовали кворк 🎉</h2>
      <p class="text-gray-600 mb-8 text-center max-w-[500px]">
        Всё готово — проверьте введённые данные. После публикации ваш кворк появится в поиске и станет доступен для заказчиков.
      </p>

      <div class="flex gap-6 mt-8">
        <router-link
          to="/create-work-step-3"
          class="px-10 py-3 bg-[#f6f2fc] text-[#b895fd] rounded-full font-semibold hover:bg-[#ede8fc] transition"
        >Назад</router-link>
        <button
          @click="publish"
          class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
        >Опубликовать</button>
      </div>
    </div>
  </div>
</template>
