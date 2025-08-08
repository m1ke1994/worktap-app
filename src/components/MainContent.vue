<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const hovered = ref(false)

function goSearch() {
  router.push(query.value ? { path: '/search', query: { q: query.value } } : '/search')
}

function goCreate() {
  router.push('/create-work')
}

// Небольшая анимация параллакса для карточек справа
const tilt = ref({ x: 0, y: 0 })
function onMouseMove(e) {
  const { innerWidth: w, innerHeight: h } = window
  const x = ((e.clientX / w) - 0.5) * 10
  const y = ((e.clientY / h) - 0.5) * 10
  tilt.value = { x, y }
}

onMounted(() => window.addEventListener('mousemove', onMouseMove))
onBeforeUnmount(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Фон: мягкий градиент + анимированные блобы -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute -top-40 -left-24 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-emerald-400 via-teal-400 to-sky-400 opacity-30 animate-pulse"></div>
      <div class="absolute -bottom-48 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 opacity-25 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(30rem_20rem_at_20%_10%,rgba(255,255,255,.6),transparent),radial-gradient(30rem_20rem_at_80%_90%,rgba(255,255,255,.5),transparent)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.2),transparent_20%,transparent_80%,rgba(255,255,255,.15))]"></div>
    </div>

    <div class="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
      <!-- Левая колонка -->
      <div class="space-y-7">
        <div class="inline-flex items-center gap-2 text-xs md:text-sm font-medium rounded-full bg-white/70 backdrop-blur px-3 py-1 shadow-sm border border-black/5">
          <span class="i-lucide-stars" />
          Твой маркетплейс услуг · без комиссий
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-gray-900">
          Найди <span class="text-emerald-600">исполнителя</span> или опубликуй 
          <span class="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">заказ</span> за минуты
        </h1>

        <p class="text-lg md:text-xl text-gray-600 max-w-xl">
          Поиск фрилансеров и заказчиков с прозрачным процессом и быстрым стартом. Без внутренней валюты, гарантий и удержаний — всё честно и напрямую.
        </p>

        <!-- Поисковая строка -->
        <div class="relative group max-w-2xl">
          <div class="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl border border-black/10 shadow-md focus-within:ring-2 focus-within:ring-emerald-400 px-3 py-2">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
            <input v-model="query" @keyup.enter="goSearch" type="text" placeholder="Например: дизайн логотипа, верстка, парсинг" class="w-full bg-transparent outline-none text-base md:text-lg py-2" />
            <button @click="goSearch" class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[.98] transition">
              Искать
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-3 text-sm">
            <button class="px-3 py-1 rounded-full bg-white/70 border border-black/10 hover:bg-white" @click="query='Vue 3'; goSearch()">Vue 3</button>
            <button class="px-3 py-1 rounded-full bg-white/70 border border-black/10 hover:bg-white" @click="query='Django REST'; goSearch()">Django REST</button>
            <button class="px-3 py-1 rounded-full bg-white/70 border border-black/10 hover:bg-white" @click="query='Парсинг'; goSearch()">Парсинг</button>
            <button class="px-3 py-1 rounded-full bg-white/70 border border-black/10 hover:bg-white" @click="query='UI/UX'; goSearch()">UI/UX</button>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex flex-wrap gap-3">
          <button @click="goCreate" class="px-5 py-3 rounded-xl font-semibold text-white bg-gray-900 hover:bg-black shadow-lg shadow-emerald-500/10">
            Создать кворк
          </button>
          <button @mouseenter="hovered = true" @mouseleave="hovered = false" class="px-5 py-3 rounded-xl font-semibold bg-white/70 backdrop-blur border border-black/10 hover:bg-white">
            Как это работает?
          </button>
        </div>

        <!-- Цифры доверия -->
        <div class="grid grid-cols-3 gap-4 pt-2 max-w-xl">
          <div class="rounded-2xl bg-white/70 backdrop-blur border border-black/10 p-4 text-center">
            <div class="text-2xl md:text-3xl font-extrabold">3k+</div>
            <div class="text-xs md:text-sm text-gray-500">исполнителей</div>
          </div>
          <div class="rounded-2xl bg-white/70 backdrop-blur border border-black/10 p-4 text-center">
            <div class="text-2xl md:text-3xl font-extrabold">1.2k</div>
            <div class="text-xs md:text-sm text-gray-500">активных заказов</div>
          </div>
          <div class="rounded-2xl bg-white/70 backdrop-blur border border-black/10 p-4 text-center">
            <div class="text-2xl md:text-3xl font-extrabold">4.9★</div>
            <div class="text-xs md:text-sm text-gray-500">средняя оценка</div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: стек карточек с лёгким 3D -->
      <div class="relative h-[520px] md:h-[560px]">
        <div
          class="absolute inset-0 [perspective:1000px]"
          :style="{ '--rx': `${tilt.y}deg`, '--ry': `${-tilt.x}deg` }"
        >
          <!-- Карточка 1 -->
          <div class="card-tilt absolute left-4 right-12 top-6 rotate-[-2deg]">
            <CardGig title="Дизайн логотипа" price="от 5 000 ₽" tag="Дизайн" avatarColor="bg-emerald-500" />
          </div>
          <!-- Карточка 2 -->
          <div class="card-tilt absolute left-10 right-6 top-40 rotate-[1.5deg]">
            <CardGig title="Верстка лендинга" price="от 12 000 ₽" tag="Frontend" avatarColor="bg-blue-500" />
          </div>
          <!-- Карточка 3 -->
          <div class="card-tilt absolute left-20 right-20 top-72 rotate-[-1deg]">
            <CardGig title="Django REST API" price="от 15 000 ₽" tag="Backend" avatarColor="bg-violet-500" />
          </div>

          <!-- Линии-сетки для глубины -->
          <svg class="absolute -z-10 left-0 top-0 w-full h-full opacity-30" viewBox="0 0 600 600" fill="none">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Бегущая строка категорий -->
    <div class="relative mt-4 py-4 border-t border-white/40 bg-white/40 backdrop-blur">
      <div class="animate-marquee whitespace-nowrap text-sm md:text-base font-medium text-gray-700/90">
        <span class="mx-6">Дизайн</span>
        <span class="mx-6">Frontend</span>
        <span class="mx-6">Backend</span>
        <span class="mx-6">Парсинг</span>
        <span class="mx-6">SEO</span>
        <span class="mx-6">SMM</span>
        <span class="mx-6">QA</span>
        <span class="mx-6">DevOps</span>
        <span class="mx-6">Аналитика</span>
        <span class="mx-6">Копирайтинг</span>
      </div>
    </div>

    <!-- Подсказка при ховере по «Как это работает?» -->
    <transition name="fade">
      <div v-if="hovered" class="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div class="rounded-2xl bg-gray-900 text-white px-4 py-3 text-sm shadow-2xl">
          Публикуешь задачу → получаешь отклики → выбираешь исполнителя. Оплата напрямую, без комиссии.
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
// Локальный компонент карточки кворка
export default {
  components: {
    CardGig: {
      props: {
        title: String,
        price: String,
        tag: String,
        avatarColor: String,
      },
      template: `
        <div class="group rounded-2xl bg-white/80 backdrop-blur border border-black/10 shadow-xl hover:shadow-2xl transition p-4 md:p-5">
          <div class="flex items-center gap-3">
            <div :class="['h-10 w-10 rounded-full text-white grid place-items-center font-bold', avatarColor]">★</div>
            <div class="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{{ tag }}</div>
          </div>
          <div class="mt-3 font-semibold text-gray-900">{{ title }}</div>
          <div class="text-sm text-gray-500">{{ price }}</div>
          <div class="mt-3 flex items-center justify-between">
            <div class="flex -space-x-2">
              <span class="h-7 w-7 rounded-full bg-emerald-200 border border-white"></span>
              <span class="h-7 w-7 rounded-full bg-blue-200 border border-white"></span>
              <span class="h-7 w-7 rounded-full bg-violet-200 border border-white"></span>
            </div>
            <button class="text-sm px-3 py-1.5 rounded-lg bg-gray-900 text-white group-hover:bg-black transition">Отклики</button>
          </div>
        </div>
      `,
    },
  },
}
</script>

<style scoped>
/* Маркировка для 3D-наклона карточек */
.card-tilt {
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .2s ease-out;
}

/* Простейшая бегущая строка */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  display: inline-block;
  min-width: 200%;
  padding-left: 100%;
  animation: marquee 18s linear infinite;
}

/* Тонкое появление тултипа */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
