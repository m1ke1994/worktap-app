<script setup>
defineProps({
  image: String,
  name: String,
  profession: String,
  projects: Number,
  rating: Number,
  status: Boolean
});
</script>

<template>
  <div class="freelancers-card bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]">
    <div class="flex justify-between gap-4 ">
      <div class="left relative w-24 h-24 flex-shrink-0">
        <img 
          :src="'src/assets/' + image" 
          alt="Фото фрилансера" 
          class="w-full h-full object-cover rounded-lg"
        >
        <img 
          class="absolute -top-0 -right-0 w-4 h-4" 
          :src="status ? '/src/assets/online.svg' : '/src/assets/offline.svg'" 
          :alt="status ? 'online' : 'offline'"
        >
      </div>
      
      <div class="right flex flex-col justify-between flex-grow">
        <div>
          <h3 class="font-bold text-lg">{{ name }}</h3>
          <p class="text-[#FBA457] text-sm">{{ profession }}</p>
        </div>
        
        <div class="space-y-1">
          <p class="text-sm">Выполнено проектов: <span class="text-[#1DBF73] font-bold">{{ projects }}</span></p>
          <p class="text-sm">Рейтинг: <span class="text-[#1DBF73] font-bold">{{ rating }}</span></p>
        </div>
      </div>
    </div>
    
    <button class="mt-4 font-bold w-full text-[#1DBF73] border-2 border-[#1DBF73] rounded-2xl px-4 py-2 hover:bg-[#1DBF73] hover:text-white transition-all duration-300">
      Написать
    </button>
  </div>
</template>

<style scoped>

</style>