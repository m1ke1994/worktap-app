<script setup>
defineProps({
  work: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      image: ''
    })
  }
})
</script>

<template>
  <div class="card border border-[#F7F6FF] rounded-xl shadow-lg flex flex-col p-6 gap-4 bg-white hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 ">
    <div class="flex items-center gap-4">
      <img :src="work.image" :alt="work.title" class="w-12 h-12">
      <p class="text-xl font-bold">{{ work.title }}</p>
    </div>
    <div>
      <p class="text-gray-600">{{ work.description }}</p>
    </div>
    <button class=" w-full mt-auto font-bold text-[#1DBF73] border-2 border-[#1DBF73] rounded-2xl px-4 py-1.5 hover:bg-[#1DBF73] hover:text-white transition-all duration-300">
      Посмотреть
    </button>
  </div>
</template>

<style scoped>
.card {
  min-height: 250px;
}
</style>

