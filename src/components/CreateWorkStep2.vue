<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Основные' },
  { label: 'Стоимость и опции' },
  { label: 'Описание' },
  { label: 'Требования' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(2)

// Пакеты (как на фриланс-биржах)
const packages = ref([
  {
    name: 'Эконом',
    description: 'Минимальный пакет для быстрого запуска',
    delivery_time: 3,
    revisions: 1,
    price: 2500,
    options: []
  },
  {
    name: 'Стандарт',
    description: 'Оптимальное решение с балансом цены и качества',
    delivery_time: 5,
    revisions: 2,
    price: 4500,
    options: []
  },
  {
    name: 'Бизнес',
    description: 'Максимум возможностей для вашего проекта',
    delivery_time: 7,
    revisions: 3,
    price: 7500,
    options: []
  }
])

function addPackageOption(idx) {
  packages.value[idx].options.push({
    name: '',
    hint: '',
    delivery: 1,
    price: 500
  })
}

// Дополнительные опции
const extraOptions = ref([
  {
    name: 'Адаптация под мобильные',
    hint: 'Дизайн и вёрстка под мобильные устройства',
    delivery: 1,
    price: 800
  }
])

function addExtraOption() {
  extraOptions.value.push({
    name: '',
    hint: '',
    delivery: 1,
    price: 500
  })
}

function removeExtraOption(idx) {
  extraOptions.value.splice(idx, 1)
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

    <div class="w-[933px]">
      <!-- Пакеты -->
      <h2 class="font-semibold text-lg mb-6">Пакеты</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(pkg, idx) in packages" :key="pkg.name" class="bg-white rounded-2xl border border-[#f3f0fa] p-7 flex flex-col shadow-sm">
          <div class="font-semibold text-xl text-center mb-5">{{ pkg.name }}</div>
          <div class="mb-4">
            <div class="text-gray-700 font-medium">Описание пакета</div>
            <div class="text-gray-500 text-sm mt-1">{{ pkg.description }}</div>
          </div>
          <div class="flex justify-between text-sm py-2 border-b">
            <span>Срок выполнения</span>
            <span class="text-gray-600 font-semibold">{{ pkg.delivery_time }} дня</span>
          </div>
          <div class="flex justify-between text-sm py-2 border-b">
            <span>Количество доработок</span>
            <span class="text-gray-600 font-semibold">{{ pkg.revisions }}</span>
          </div>
          <div class="flex justify-between text-sm py-2 mb-5">
            <span>Стоимость</span>
            <span class="text-green-700 font-bold">{{ pkg.price.toLocaleString('ru-RU') }} ₽</span>
          </div>
          <!-- Пример добавления опции к пакету -->
          <button
            class="w-full py-2 rounded-xl bg-[#f6f2fc] text-[#b895fd] font-semibold mt-auto hover:bg-[#ece3fa] transition"
            @click="addPackageOption(idx)">
            Добавить опцию
          </button>
        </div>
      </div>

      <!-- Дополнительные опции -->
      <h3 class="font-semibold text-lg mt-14 mb-4">Дополнительные опции</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Существующие -->
        <div
          v-for="(opt, idx) in extraOptions"
          :key="idx"
          class="bg-white rounded-2xl border border-[#f3f0fa] p-7 flex flex-col justify-between shadow-sm"
        >
          <div>
            <div class="mb-3">
              <div class="font-semibold text-gray-700">Название</div>
              <div class="text-gray-600">{{ opt.name }}</div>
            </div>
            <div class="mb-2">
              <div class="text-gray-400 text-xs">Подсказка для покупателя</div>
              <div class="text-gray-600 text-sm">{{ opt.hint }}</div>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-500">Срок</span>
              <span class="font-medium">{{ opt.delivery }} день</span>
            </div>
            <div class="flex justify-between text-sm mb-5">
              <span class="text-gray-500">Цена</span>
              <span class="font-bold text-green-700">{{ opt.price.toLocaleString('ru-RU') }} ₽</span>
            </div>
          </div>
          <button
            class="w-full py-2 rounded-xl bg-[#fde6e6] text-[#fa5c5c] font-semibold hover:bg-[#fcbcbc] transition"
            @click="removeExtraOption(idx)">
            Удалить
          </button>
        </div>
        <!-- Добавить новую опцию -->
        <div class="bg-[#f6f2fc] rounded-2xl border-2 border-dashed border-[#e0d4f6] flex flex-col items-center justify-center p-6 min-h-[220px] hover:bg-[#ede8fc] transition cursor-pointer"
             @click="addExtraOption">
          <div class="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-2 border border-[#e6d7fc] text-4xl text-orange-400">+</div>
          <div class="font-semibold text-[#b895fd] text-center">Добавить новую опцию</div>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex justify-between mt-10">
        <button class="px-10 py-3 bg-[#f6f2fc] text-[#b895fd] rounded-full font-semibold hover:bg-[#ede8fc] transition">Назад</button>
        <button class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition">Дальше</button>
      </div>
    </div>
  </div>
</template>
