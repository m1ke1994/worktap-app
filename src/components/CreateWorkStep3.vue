<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(3)

// Список картинок и файлов
const images = ref([])
const files = ref([])

// Добавление изображений
function onImageChange(e) {
  for (const file of e.target.files) {
    if (!file.type.startsWith('image/')) continue
    // Превью
    const reader = new FileReader()
    reader.onload = event => {
      images.value.push({ name: file.name, src: event.target.result, file })
    }
    reader.readAsDataURL(file)
  }
  e.target.value = null
}
// Удаление
function removeImage(idx) {
  images.value.splice(idx, 1)
}

// Добавление файлов (любые форматы, кроме картинок)
function onFileChange(e) {
  for (const file of e.target.files) {
    if (file.type.startsWith('image/')) continue // картинки только через галерею
    files.value.push(file)
  }
  e.target.value = null
}
function removeFile(idx) {
  files.value.splice(idx, 1)
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

    <div class="w-[933px] bg-white rounded-xl p-8 shadow border border-gray-100">
      <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Добавьте изображения и файлы к кворку</h2>

      <!-- Галерея изображений -->
      <div class="mb-8">
        <label class="block text-gray-600 mb-2 font-semibold">Изображения (до 5 шт)</label>
        <div class="flex flex-wrap gap-4">
          <label
            class="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#ded4f5] rounded-2xl bg-[#f7faff] text-[#b895fd] text-4xl cursor-pointer hover:bg-[#ede8fc] transition"
            v-if="images.length < 5"
          >
            <span>+</span>
            <input type="file" accept="image/*" class="hidden" multiple @change="onImageChange" />
            <span class="text-xs text-gray-400 mt-2">Добавить</span>
          </label>
          <div
            v-for="(img, idx) in images"
            :key="img.name + idx"
            class="w-32 h-32 rounded-2xl overflow-hidden border border-[#ded4f5] relative group"
          >
            <img :src="img.src" :alt="img.name" class="object-cover w-full h-full" />
            <button
              @click="removeImage(idx)"
              class="absolute top-1 right-1 bg-white rounded-full text-red-400 px-2 font-bold opacity-80 group-hover:opacity-100 hover:text-red-600 transition"
              title="Удалить"
            >×</button>
          </div>
        </div>
        <div class="text-xs text-gray-400 mt-2">
          Добавьте фото результата или примеры работ. Максимум 5 файлов.
        </div>
      </div>

      <!-- Файлы -->
      <div class="mb-8">
        <label class="block text-gray-600 mb-2 font-semibold">Документы, примеры, исходники (опционально)</label>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3" v-for="(file, idx) in files" :key="file.name + idx">
            <span class="text-[#473d69] font-medium">{{ file.name }}</span>
            <button @click="removeFile(idx)" class="text-red-400 hover:text-red-600 text-lg" title="Удалить">×</button>
          </div>
        </div>
        <label class="inline-block mt-3 px-5 py-2 bg-[#f6f2fc] text-[#a181ff] rounded-full font-medium hover:bg-[#ede8fc] transition cursor-pointer">
          + Добавить файл
          <input type="file" class="hidden" multiple @change="onFileChange" />
        </label>
        <div class="text-xs text-gray-400 mt-2">
          Вы можете приложить бриф, примеры, инструкции, архивы и т.д.
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex justify-between mt-10">
        <router-link
          to="/create-work-step-2"
          class="px-10 py-3 bg-[#f6f2fc] text-[#b895fd] rounded-full font-semibold hover:bg-[#ede8fc] transition"
        >Назад</router-link>
        <router-link
          to="/create-work-step-4"
          class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
          :disabled="images.length === 0"
        >Дальше</router-link>
      </div>
    </div>
  </div>
</template>
