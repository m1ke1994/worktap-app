<template>
     <header class="shadow-sm sticky top-0 z-50">
      <div class="bg-[#F7F6FF]">
           <div class="container mx-auto px-4">
        <nav class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <img src="/src/assets/logo.svg" alt="Логотип" class="h-8">
          </div>
          <ul class="hidden md:flex gap-8 text-lg font-medium">
            <li class="group relative">
              <a href="#" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Биржа</a>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <a href="#" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Ворки</a>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <a href="#" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Создать ворк</a>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li class="group relative">
              <a href="#" class="text-gray-700 hover:text-[#1DBF73] transition-colors duration-300">Создать заказ</a>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1DBF73] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
          <div class="flex gap-3">
            <button class="font-bold text-[#1DBF73] border-2 border-[#1DBF73] rounded-lg px-4 py-1.5 hover:bg-[#1DBF73] hover:text-white transition-all duration-300 text-sm md:text-base md:px-6 md:py-2">
              Регистрация
            </button>
            <button class="font-bold text-[#1DBF73] border-2 border-[#1DBF73] rounded-lg px-4 py-1.5 hover:bg-[#1DBF73] hover:text-white transition-all duration-300 text-sm md:text-base md:px-6 md:py-2">
              Войти
            </button>
          </div>
        </nav>
      </div>
      </div>
     
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
