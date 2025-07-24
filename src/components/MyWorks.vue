<script setup>
const works = [
  {
    "title": "Дизайн сайта",
    "description": "Дизайн сайта для компании по производству мебели",
    "image": "/assets/category/design_site.jpg",
    "price": 5000,
    "currency": "RUB"
  },
  {
    "title": "Разработка логотипа",
    "description": "Логотип для кофейни",
    "image": "/assets/category/logo.jpg",
    "price": 2500,
    "currency": "RUB"
  },
  {
    "title": "Вёрстка лендинга",
    "description": "Лендинг для агентства недвижимости",
    "image": "/assets/category/verstka.jpg",
    "price": 6000,
    "currency": "RUB"
  },
  {
    "title": "Баннер для соцсетей",
    "description": "Яркий баннер для Instagram",
    "image": "/assets/category/banner.jpg",
    "price": 1200,
    "currency": "RUB"
  },
  {
    "title": "UX/UI прототип",
    "description": "Прототип мобильного приложения",
    "image": "/assets/category/prototype.jpg",
    "price": 4000,
    "currency": "RUB"
  },
  {
    "title": "Редизайн сайта",
    "description": "Обновление корпоративного сайта",
    "image": "/assets/category/redesign.jpg",
    "price": 7000,
    "currency": "RUB"
  },
  {
    "title": "Интернет-магазин",
    "description": "Полная разработка интернет-магазина",
    "image": "/assets/category/shop.jpg",
    "price": 12000,
    "currency": "RUB"
  },
  {
    "title": "Анимация",
    "description": "Короткая анимация для рекламы",
    "image": "/assets/category/animation.jpg",
    "price": 3500,
    "currency": "RUB"
  },
  {
    "title": "Landing Page",
    "description": "Разработка одностраничного сайта под ключ",
    "image": "/assets/category/landing_full.jpg",
    "price": 8000,
    "currency": "RUB"
  }
]

function formatPrice(price, currency) {
  if (currency === 'RUB') {
    return price.toLocaleString('ru-RU') + ' ₽'
  }
  return price + ' ' + currency
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="font-bold text-3xl text-left mb-6">Мои ворки</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Плюсовая карточка -->
      <div
        class="bg-[#D7FFEC] rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[250px] cursor-pointer hover:shadow-2xl transition-all duration-300"
      >
        <img
          src="/assets/plus_works.svg"
          alt="Добавить ворк"
          class="w-16 h-16 mb-2 hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]"
        />
        <!-- Можно добавить подпись, если нужно: -->
        <!-- <div class="mt-2 font-medium text-lg text-[#00C26D]">Добавить ворк</div> -->
      </div>
      <!-- Основные карточки -->
      <div
        v-for="(work, idx) in works"
        :key="idx"
        class="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]"
      >
        <img
          :src="work.image"
          :alt="work.title"
          class="h-44 w-full object-cover rounded-xl mb-4"
        />
        <h3 class="text-xl font-semibold mb-2">{{ work.title }}</h3>
        <p class="text-gray-600 mb-4">{{ work.description }}</p>
        <div class="mt-auto text-right font-bold text-lg">
          {{ formatPrice(work.price, work.currency) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* если нужен кастомный стиль для плюсовой карточки — сюда */
</style>
