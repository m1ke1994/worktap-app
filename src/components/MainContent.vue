<!-- MainContent.vue -->
<script setup>
import SlidesMain from './SlidesMain.vue'
</script>

<template>
  <section id="main-content" class="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-10 items-center">
    <div class="w-full md:w-1/2 space-y-6">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          Связь заказчиков и фрилансеров — 
          <span class="text-[#1DBF73] block">просто, безопасно, выгодно</span>
        </h1>
      </div>
      <p class="text-lg text-gray-600">
        Любой бюджет — от стартапов до крупных компаний: выбирайте исполнителей по рейтингу, отзывам и цене.
      </p>

      <div class="relative w-full max-w-lg">
        <input 
          type="text" 
          placeholder="Поиск по заданиям..." 
          class="w-full h-14 pl-5 pr-32 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-transparent shadow-sm text-gray-700"
        >
        <button 
          class=" absolute right-0 top-0 h-full px-6 text-white bg-[#1DBF73] rounded-r-xl hover:bg-[#18a966] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1DBF73] font-bold"
        >
          Найти
        </button>
      </div>
    </div>

    <div class="w-full md:w-1/2">
      <SlidesMain />
    </div>
  </section>
</template>