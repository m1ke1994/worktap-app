<script setup>
const props = defineProps({
  work: Object,
  avatar: Object
})
function formatPrice(price) {
  return price ? price.toLocaleString("ru-RU") + " ₽" : "";
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg flex flex-col p-6 hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]">
    <div class="flex gap-4 items-center mb-4">
      <div
        class="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shadow"
        :style="{ background: avatar.color }"
      >
        {{ avatar.initials }}
      </div>
      <div>
        <div class="text-[#6555BE] font-medium">{{ work.owner_first_name }} {{ work.owner_last_name }}</div>
        <div class="text-xs text-gray-400">ID: {{ work.owner_id }}</div>
      </div>
    </div>
    <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ work.title }}</h3>
    <div class="flex gap-2 text-xs mb-2">
      <span class="bg-[#f6f2fc] text-[#6555BE] rounded px-2 py-1">{{ work.category }}</span>
      <span v-if="work.subcategory" class="bg-[#e8fbf5] text-[#1DBF73] rounded px-2 py-1">{{ work.subcategory }}</span>
    </div>
    <div class="text-gray-500 mb-3 text-sm line-clamp-3">{{ work.description }}</div>
    <div class="mt-auto flex items-end justify-between">
      <span class="font-bold text-[#1DBF73] text-base">{{ formatPrice(work.price) }}</span>
      <!-- можешь добавить "Подробнее" или иконку -->
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
