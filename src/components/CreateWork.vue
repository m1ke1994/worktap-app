<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Основные' },
  { label: 'Стоимость и опции' },
  { label: 'Описание' },
  { label: 'Требования' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(1)

const categories = [
  { name: 'Дизайн', sub: ['Веб-дизайн', 'Баннеры', 'Логотипы'] },
  { name: 'Разработка', sub: ['Сайты', 'Мобильные приложения', 'Боты'] },
  { name: 'Тексты', sub: ['Копирайтинг', 'Переводы', 'Редактура'] },
]
const selectedCategory = ref(categories[0].name)
const selectedSubcategory = ref(categories[0].sub[0])

const tags = ref(['Веб-дизайн', 'Дизайн сайта', 'Figma'])
function removeTag(idx) {
  tags.value.splice(idx, 1)
}
const workTitle = ref('Дизайн лендинга для мебельной компании')

function onCategoryChange(e) {
  const cat = categories.find(cat => cat.name === e.target.value)
  selectedCategory.value = cat.name
  selectedSubcategory.value = cat.sub[0]
}

function goNext() {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}
</script>

<template>
  <div class="bg-[#f7faff] min-h-screen flex flex-col items-center py-10">
    <!-- Stepper -->
    <div class="w-[933px] bg-white border border-blue-200 rounded-xl p-3 mb-8">
      <div class="flex justify-between items-center relative">
        <div class="absolute left-10 right-10 top-1/2 h-1 bg-[#ded4f5] z-0"></div>
        <div v-for="(step, idx) in steps" :key="idx" class="flex flex-col items-center z-10 w-1/6 cursor-pointer"
             @click="currentStep = idx + 1">
          <div
            class="flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold border-4 transition-all"
            :class="{
              'bg-green-500 text-white border-green-300': currentStep === idx+1,
              'bg-[#c9bbe5] text-white border-[#ded4f5]': currentStep !== idx+1,
            }"
          >{{ idx+1 }}</div>
          <span class="mt-1 text-xs font-medium text-[#6a6e8d] whitespace-nowrap">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <div class="w-[933px] bg-white rounded-xl p-8 space-y-6 shadow border border-gray-100">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <label class="block text-gray-500 mb-1 font-semibold">Название</label>
          <input v-model="workTitle" type="text" class="w-full border-b border-gray-200 text-lg py-2 bg-transparent focus:outline-none" />
        </div>
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="block text-gray-500 mb-1 font-semibold">Категория</label>
            <select class="w-full border-b border-gray-200 py-2 bg-transparent focus:outline-none text-gray-700"
                    v-model="selectedCategory" @change="onCategoryChange">
              <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-500 mb-1 font-semibold">Подкатегория</label>
            <select class="w-full border-b border-gray-200 py-2 bg-transparent focus:outline-none text-gray-700"
                    v-model="selectedSubcategory">
              <option
                v-for="sub in categories.find(cat => cat.name === selectedCategory)?.sub"
                :key="sub"
                :value="sub"
              >{{ sub }}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-gray-500 mb-1 font-semibold">Теги</label>
        <div class="flex flex-wrap gap-2">
          <span v-for="(tag, idx) in tags" :key="idx" class="flex items-center bg-[#f7f6fc] border border-[#ded4f5] rounded-2xl px-4 py-1 text-[#6a6e8d] text-sm">
            {{ tag }}
            <button @click="removeTag(idx)" class="ml-2 text-[#6a6e8d] hover:text-red-500 font-bold text-xl leading-none focus:outline-none">&times;</button>
          </span>
        </div>
      </div>

      <!-- Кнопка Дальше -->
      <div class="pt-4 text-right">
        <router-link
          to="/create-work-step-2"
          class="px-8 py-2 bg-[#1DBF73] hover:bg-[#5b3fc8] text-white font-semibold rounded-full  transition-all duration-300"
          :disabled="currentStep === steps.length"
        >
          Дальше
        </router-link>
      </div>
    </div>
  </div>
</template>
