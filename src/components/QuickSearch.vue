<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['close'])

const query = ref('')


</script>

<template>
  <div class="relative overflow-hidden text-center px-5 py-28 md:py-40 bg-[#F7F6FF] font-sans">
    <!-- Кнопка закрытия -->
    <button
      class="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-gray-600 hover:opacity-70"
      aria-label="Close quick search"
      @click="emit('close')"
    >
      &times; Закрыть быстрый поиск
    </button>

    <!-- Заголовок -->
    <h1 class="mx-auto mb-10 max-w-3xl text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gray-900">
      Ищите и находите подходящую работу среди
      <span class="text-[#17D88D]">5,000+</span>
      проектов и покажите на что Вы способны!
    </h1>

    <!-- Форма поиска -->
    <form  class="mx-auto mb-8 inline-block">
      <div class="relative w-60 sm:w-96 rounded-full bg-[#EBEAF7]">
        <input
          v-model="query"
          type="text"
          placeholder="Укажите категорию..."
          aria-label="Поисковый запрос"
          class="w-full rounded-full bg-transparent px-4 py-3 pr-28 text-sm focus:outline-none"
        />
        <button
          type="submit"
          class="absolute inset-y-0 right-0 flex items-center rounded-r-full bg-[#FF9F4B] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-70"
        >
          Найти
        </button>
      </div>
    </form>

    <!-- Категории -->
    <ul class="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs">
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Тексты и переводы</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Разработка</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Дизайн</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Аудио, видео монтаж</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">SEO и оптимизация</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Бизнес и жизнь</li>
      <li class="cursor-pointer text-gray-600 text-lg hover:underline">Соцсети и реклама</li>
      <li
        class="cursor-pointer rounded-full border border-[#FF9F4B] px-4 py-1 text-[#FF9F4B] hover:bg-[#FF9F4B]/10 text-lg"
      >
        Все категории
      </li>
    </ul>

    <!-- Декоративные круги (inline‑style, чтобы не писать CSS) -->
    <div class="absolute -left-14 top-40 h-44 w-44 rounded-full bg-[#FFE4CC] opacity-50"></div>
    <div class="absolute right-36 top-28 h-20 w-20 rounded-full bg-[#D7FFE4] opacity-50"></div>
    <div class="absolute left-64 bottom-24 h-9 w-9 rounded-full bg-[#D7FFE4] opacity-50"></div>
    <div class="absolute right-52 bottom-20 h-9 w-9 rounded-full bg-[#FFE4CC] opacity-50"></div>
    <div class="absolute top-8 left-[460px] hidden h-20 w-20 rounded-full bg-[#FFE4CC] opacity-50 md:block"></div>
  </div>
</template>
