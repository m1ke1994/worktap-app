<script setup>
import CurrentWorkCard from './CurrentWorkCard.vue'

const works = [
  {
    title: "Сделать дизайн интернет-магазина",
    description: "Требуется разработать современный и удобный интерфейс для интернет-магазина одежды. Учесть мобильную версию и продумать UX для увеличения конверсии.",
    image: "/src/assets/img1.svg"
  },
  {
    title: "Разработка логотипа компании",
    description: "Необходимо создать запоминающийся логотип для IT-стартапа. Стиль - минимализм, цветовая гамма: синий и белый. Должен отражать инновационность компании.",
    image: "/src/assets/img2.svg"
  },
  {
    title: "Создание мобильного приложения",
    description: "Разработка кроссплатформенного приложения для доставки еды. Требуется интеграция с платежными системами и картами. Срок - 3 месяца.",
    image: "/src/assets/img3.svg"
  },
  {
    title: "Верстка сайта по макету",
    description: "Адаптивная верстка лендинга из Figma. Требуется pixel-perfect соответствие макету. Оптимизация скорости загрузки и семантическая разметка.",
    image: "/src/assets/img4.svg"
  },
  {
    title: "Написание технической документации",
    description: "Систематизация API документации для веб-сервиса. Требуется описать все endpoints, примеры запросов/ответов, error codes на английском языке.",
    image: "/src/assets/img5.svg"
  }
 
]
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="font-bold text-3xl text-left mb-6">Актуальные ворки</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Основные карточки -->
      <CurrentWorkCard 
        v-for="(work, index) in works" 
        :key="index"
        :work="work"
      />
      
      <!-- Специальная карточка "Смотреть все" -->
     <div class="card border rounded-xl shadow-lg flex flex-col p-6 bg-[#F7F6FF] hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]">
  <div class="flex flex-col items-center justify-center h-full gap-2">
    <p class="text-xl font-bold text-[#1DBF73] text-center">Смотреть все ворки</p>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#1DBF73] mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
</div>
    </div>
  </div>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>