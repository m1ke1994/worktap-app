<script setup>
import { ref } from 'vue'

// Положительные отзывы
const positiveReviews = [
  { name: 'Алексей', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Мария', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Ольга', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Игорь', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Наталья', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Сергей', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 4, image: 'assets/freelancer.svg' },
  { name: 'Елена', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Антон', text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla.  ', stars: 5, image: 'assets/freelancer.svg' },
  { name: 'Ксения', text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 4, image: 'assets/freelancer.svg' },
  { name: 'Дмитрий', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tincidunt eget eu, eget commodo condimentum non, fringilla fermentum. Morbi sed enim facilisis metus pretium leo, mauris. In egestas cursus orci dignissim in lectus nulla. ', stars: 5, image: 'assets/freelancer.svg' },
]

// Отрицательные отзывы
const negativeReviews = [
  { name: 'Ирина', text: 'Задержка в сроках, не рекомендую.', stars: 2, image: 'assets/freelancer.svg' },
  { name: 'Максим', text: 'Не соответствует ТЗ.', stars: 1, image: 'assets/freelancer.svg' },
  { name: 'Павел', text: 'Качество на низком уровне.', stars: 2, image: 'assets/freelancer.svg' },
  { name: 'Татьяна', text: 'Осталась недовольна работой.', stars: 1, image: 'assets/freelancer.svg' },
  { name: 'Виктор', text: 'Пропал после начала проекта.', stars: 1, image: 'assets/freelancer.svg' },
  { name: 'Оксана', text: 'Всё пришлось переделывать.', stars: 2, image: 'assets/freelancer.svg' },
  { name: 'Роман', text: 'Не рекомендую. Потеря времени.', stars: 1, image: 'assets/freelancer.svg' },
  { name: 'Жанна', text: 'Общение на низкоMyReviews.vueм уровне.', stars: 2, image: 'assets/freelancer.svg' },
  { name: 'Евгений', text: 'Завалил сроки без объяснений.', stars: 1, image: 'assets/freelancer.svg' },
  { name: 'Галина', text: 'Ожидала большего за эти деньги.', stars: 2, image: 'assets/freelancer.svg' },
]

const activeTab = ref('positive')
</script>

<template>
  <section class="rewiews">
    <div class="container mx-auto px-4 py-8">
      <h2 class="font-bold text-3xl mb-6">Отзывы</h2>

      <!-- Tabs -->
      <ul class="flex gap-4 mb-6">
        <li
          :class="['font-bold text-xl cursor-pointer transition-all duration-300',
            activeTab === 'positive' ? 'text-[#1DBF73]' : 'text-black hover:text-[#1DBF73]']"
          @click="activeTab = 'positive'"
        >
          Положительные <span>({{ positiveReviews.length }})</span>
        </li>
        <li
          :class="['font-bold text-xl cursor-pointer transition-all duration-300',
            activeTab === 'negative' ? 'text-[#1DBF73]' : 'text-black hover:text-[#1DBF73]']"
          @click="activeTab = 'negative'"
        >
          Отрицательные <span>({{ negativeReviews.length }})</span>
        </li>
      </ul>

      <!-- Positive -->
      <div v-if="activeTab === 'positive'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, idx) in positiveReviews"
          :key="idx"
          class="bg-white rounded-xl shadow-md p-5"
        >
          <div class="flex items-center gap-4 mb-3">
            <img :src="review.image" alt="avatar" class="w-12 h-12 rounded-full" />
            <div class="font-semibold text-lg">{{ review.name }}</div>
          </div>
          <p class="text-gray-600 mb-2">{{ review.text }}</p>
          <div class="flex gap-1 mt-1">
            <span
              v-for="n in 5"
              :key="n"
              class="text-yellow-400 text-xl"
            >
              {{ n <= review.stars ? '★' : '☆' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Negative -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, idx) in negativeReviews"
          :key="idx"
          class="bg-white rounded-xl shadow-md p-5"
        >
          <div class="flex items-center gap-4 mb-3">
            <img :src="review.image" alt="avatar" class="w-12 h-12 rounded-full" />
            <div class="font-semibold text-lg">{{ review.name }}</div>
          </div>
          <p class="text-gray-600 mb-2">{{ review.text }}</p>
          <div class="flex gap-1 mt-1">
            <span
              v-for="n in 5"
              :key="n"
              class="text-yellow-400 text-xl"
            >
              {{ n <= review.stars ? '★' : '☆' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Загрузить ещё -->
      <div class="mt-10 flex justify-center">
        <button
          class="font-semibold text-[#1DBF73] border border-[#1DBF73] rounded-lg px-6 py-2 hover:bg-[#1DBF73] hover:text-white transition-all duration-300 text-sm md:text-base"
        >
          Загрузить ещё
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* необязательные стили */
</style>
