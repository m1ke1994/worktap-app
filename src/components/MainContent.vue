<!-- MainContent.vue -->
<script setup>
import { useRouter } from 'vue-router'
import SlidesMain from './SlidesMain.vue'
import { ref } from 'vue';
/* const router = useRouter(); */
import { defineProps } from 'vue';
const props = defineProps({
  toggleQuickSearch: Function
})
</script>

<template>
  <section
    id="main-content"
    class="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-10 items-center"
  >
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

      <!-- КНОПКА БЫСТРОГО ПОИСКА -->
      <div class="relative w-full max-w-lg">
        <button @click="props.toggleQuickSearch" class="w-full h-14 flex items-center justify-center text-[#1DBF73] bg-transparent rounded-xl border border-[#1DBF73] hover:bg-[#1DBF73]  hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1DBF73] font-bold shadow-sm"
        >
          Быстрый&nbsp;поиск
        </button>
      </div>
      <!-- /КНОПКА БЫСТРОГО ПОИСКА -->
    </div>

    <div class="w-full md:w-1/2">
      <SlidesMain />
    </div>
  </section>
</template>
