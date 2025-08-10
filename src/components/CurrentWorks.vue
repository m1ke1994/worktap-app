<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import CurrentWorkCard from './CurrentWorkCard.vue'

const works = ref([])        // отображаемые работы (когда API пагинируется — это «уже загруженные страницы»)
const allBuffer = ref([])    // буфер, если API не пагинируется (храним весь массив и отрезаем порциями)
const loading = ref(true)
const loadingMore = ref(false)
const error = ref('')

// пагинация
const pageSize = 6
const page = ref(1)
const nextUrl = ref(null) // если API возвращает { results, next }, сюда кладём next

// избранное (локально + попытка POST)
const favSet = ref(new Set(JSON.parse(localStorage.getItem('wt_favs') || '[]')))
function isFav(id) { return favSet.value.has(id) }
function persistFavs() { localStorage.setItem('wt_favs', JSON.stringify([...favSet.value])) }

function normStatus(s) {
  return String(s || '').toLowerCase().trim().replace(/[\s-]+/g, '_')
}
function isPending(status) {
  const k = normStatus(status)
  return k === 'pending' || k === 'в_ожидании'
}

async function fetchInitial() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('http://localhost:8000/api/works/')
    if (!res.ok) throw new Error('Ошибка загрузки работ')
    const data = await res.json()

    // Вариант 1: пагинированный ответ
    if (data && Array.isArray(data.results)) {
      const filtered = data.results.filter(w => isPending(w.status))
      works.value = filtered
      nextUrl.value = data.next || null
    } else {
      // Вариант 2: обычный массив
      const list = Array.isArray(data) ? data : []
      allBuffer.value = list.filter(w => isPending(w.status))
      works.value = allBuffer.value.slice(0, pageSize)
    }
  } catch (e) {
    error.value = e.message || 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (loadingMore.value) return
  loadingMore.value = true
  try {
    // Есть серверная пагинация
    if (nextUrl.value) {
      const res = await fetch(nextUrl.value)
      if (!res.ok) throw new Error('Не удалось загрузить следующую страницу')
      const data = await res.json()
      const filtered = (data.results || []).filter(w => isPending(w.status))
      works.value = works.value.concat(filtered)
      nextUrl.value = data.next || null
    } else {
      // Фронтовая порционная догрузка
      if (!allBuffer.value.length) return
      page.value += 1
      const more = allBuffer.value.slice(0, page.value * pageSize)
      works.value = more
    }
  } catch (e) {
    error.value = e.message || 'Ошибка подгрузки'
  } finally {
    loadingMore.value = false
  }
}

function canLoadMore() {
  if (nextUrl.value) return true
  if (allBuffer.value.length) return works.value.length < allBuffer.value.length
  return false
}

// Автоподгрузка наблюдателем
let io
const sentinel = ref(null)
onMounted(async () => {
  await fetchInitial()
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && canLoadMore()) {
        loadMore()
      }
    })
  }, { rootMargin: '300px' })
  if (sentinel.value) io.observe(sentinel.value)
})
onBeforeUnmount(() => io?.disconnect())

// обработка избранного (оптимистично)
async function toggleFavorite(id) {
  const wasFav = isFav(id)
  if (wasFav) favSet.value.delete(id)
  else favSet.value.add(id)
  persistFavs()

  // Пытаемся дернуть API (если есть токен и эндпоинт). Ошибку — мягко игнорируем и откатываем.
  try {
    const token = localStorage.getItem('access')
    if (!token) return
    const res = await fetch(`http://localhost:8000/api/works/${id}/favorite/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('favorite failed')
  } catch {
    // откат
    if (wasFav) favSet.value.add(id)
    else favSet.value.delete(id)
    persistFavs()
  }
}
</script>

<template>
  <section class="relative">
    <div class="pointer-events-none absolute inset-x-0 -top-16 h-40 bg-gradient-to-b from-emerald-100/40 to-transparent blur-2xl"></div>

    <div class="container mx-auto px-4 py-10">
      <div class="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 class="font-extrabold text-2xl md:text-3xl tracking-tight text-slate-900">Актуальные задания</h2>
          <p class="text-slate-500 text-sm md:text-base mt-1">Только те, что сейчас «В ожидании»</p>
        </div>
        <router-link
          to="/all-works"
          class="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white transition"
        >
          Смотреть все
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M13 5l7 7-7 7M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>

      <!-- Скелетоны -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-11 h-11 rounded-full bg-slate-200 animate-pulse"></div>
            <div class="flex-1">
              <div class="h-4 bg-slate-200 rounded w-2/3 mb-2 animate-pulse"></div>
              <div class="h-3 bg-slate-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
          <div class="h-4 bg-slate-200 rounded w-5/6 mb-2 animate-pulse"></div>
          <div class="h-4 bg-slate-200 rounded w-4/6 mb-4 animate-pulse"></div>
          <div class="flex justify-between">
            <div class="h-6 w-24 rounded bg-slate-200 animate-pulse"></div>
            <div class="h-8 w-24 rounded bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Ошибка -->
      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
        {{ error }}
      </div>

      <!-- Пусто -->
      <div v-else-if="!works.length" class="text-center py-16">
        <div class="mx-auto mb-3 grid h-16 w-16 place-content-center rounded-2xl bg-emerald-500/10 text-emerald-600">
          <svg class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 0 1 3-3h8.382a3 3 0 0 1 2.122.879l3.617 3.617A3 3 0 0 1 21 9.618V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"/></svg>
        </div>
        <h3 class="font-semibold text-slate-800">Пока ничего нет</h3>
        <p class="text-slate-500 text-sm">Зайдите позже — новые задания добавляются регулярно.</p>
      </div>

      <!-- Сетка карточек -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CurrentWorkCard
          v-for="work in works"
          :key="work.id"
          :work="work"
          :avatar="{
            initials: ((work.owner_first_name?.[0] || '') + (work.owner_last_name?.[0] || '')).toUpperCase(),
            color: (() => {
              let hash=0, s=String(work.owner_id||''); for (let i=0;i<s.length;i++) hash = s.charCodeAt(i) + ((hash<<5)-hash)
              return `hsl(${Math.abs(hash)%360} 70% 86%)`
            })()
          }"
          :is-favorite="isFav(work.id)"
          @toggle-favorite="toggleFavorite"
        />
        <!-- «Смотреть все» как карточка для мобильных -->
        <router-link
          to="/all-works"
          class="lg:hidden group rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm hover:shadow-md transition relative overflow-hidden flex"
        >
          <div class="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl"></div>
          <div class="m-auto text-center">
            <p class="text-lg font-extrabold text-emerald-700">Смотреть все задания</p>
            <p class="text-sm text-emerald-700/80 mt-1">Полный список и фильтры</p>
          </div>
        </router-link>
      </div>

      <!-- Кнопка «Показать ещё» + сенсор автоподгрузки -->
      <div class="mt-8 flex items-center justify-center">
        <button
          v-if="canLoadMore()"
          @click="loadMore"
          class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
          :disabled="loadingMore"
        >
          <span v-if="!loadingMore">Показать ещё</span>
          <span v-else class="inline-flex items-center gap-2">
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/>
              <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg> Загрузка…
          </span>
        </button>
      </div>
      <div ref="sentinel" class="h-px"></div>
    </div>
  </section>
</template>
