<script setup>
import { ref, computed } from "vue";
import QuickSearch from "../components/QuickSearch.vue";

const sortOrder = ref("asc");

const leftPriceText = computed(() =>
  sortOrder.value === "asc" ? "Минимальная цена" : "Максимальная цена"
);
const rightPriceText = computed(() =>
  sortOrder.value === "asc" ? "Максимальная цена" : "Минимальная цена"
);
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <QuickSearch />
    <div class="max-w-4xl mx-auto py-16">
      <div class="flex justify-between items-center mb-2 text-sm text-gray-500">
        <div>65 проектов по дизайну</div>
        <div class="flex gap-4 text-gray-400 items-center">
          <a href="#" class="hover:text-gray-600">{{ leftPriceText }}</a>
          <span>|</span>
          <a href="#" class="hover:text-gray-600">{{ rightPriceText }}</a>
          <select
            v-model="sortOrder"
            class="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white"
          >
            <option value="asc">По возрастанию цены</option>
            <option value="desc">По убыванию цены</option>
          </select>
        </div>
      </div>

      <div
        v-for="n in 10"
        :key="n"
        class="bg-white p-4 rounded-xl shadow-sm mb-4"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-start gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              class="rounded-full w-10 h-10 object-cover"
            />
            <div>
              <div class="font-semibold text-sm mb-1">
                Нужно сделать Дизайн сайта по тематике авто
              </div>
              <div class="text-xs text-gray-500">Екатерина Иванова</div>
              <div class="text-xs text-gray-400">
                Размещено проектов на бирже: 25
              </div>
              <div class="flex items-center mt-1">
                <span class="text-yellow-400 text-xs">★★★★★</span>
                <span class="text-xs text-gray-400 ml-2">Отзывы</span>
              </div>
            </div>
          </div>
          <div class="text-right text-sm">
            <div class="text-green-500 font-semibold">Бюджет: 50 000 тенге</div>
            <div class="text-xs text-gray-400 mt-1">4 часа назад • Алматы</div>
            <div class="text-xs text-gray-400 mt-1">Предложений: 50</div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button
          class="px-4 py-2 text-sm text-green-500 border border-green-500 rounded-full font-bold hover:bg-green-50"
        >
          Загрузить еще
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
