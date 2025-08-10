<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
    <!-- Hero / Filters -->
    <header class="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
      <div class="max-w-6xl mx-auto px-4 py-5">
        <div class="flex flex-col gap-4">
          <!-- Title + count -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Задания от заказчиков</h1>
              <p class="text-sm text-slate-500">Найдите подходящее и откликайтесь</p>
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <span class="text-xs text-slate-500">Найдено:</span>
              <span class="text-sm font-semibold">{{ sortedWorks.length }}</span>
            </div>
          </div>

          <!-- Search + Sort row -->
          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1 relative">
              <input
                v-model="search"
                type="text"
                placeholder="Поиск по названию или категории…"
                class="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 pl-11 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/>
              </svg>
            </div>

            <div class="flex items-center gap-2">
              <select
                v-model="sortOrder"
                class="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-sm outline-none focus:border-emerald-400"
                title="Сортировка"
              >
                <option value="newest">Сначала новые</option>
                <option value="price_asc">Цена ↑</option>
                <option value="price_desc">Цена ↓</option>
              </select>

              <button @click="resetFilters"
                      class="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-sm hover:bg-slate-50">
                Сбросить
              </button>
            </div>
          </div>

          <!-- Status tabs -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="tab in statusTabs"
              :key="tab.value"
              @click="selectedStatus = tab.value"
              :class="[
                'px-3 py-1.5 rounded-full text-sm border transition',
                selectedStatus === tab.value
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              ]"
            >
              {{ tab.label }}
              <span v-if="tab.value" class="ml-1 text-xs opacity-80">
                ({{ statusCount(tab.value) }})
              </span>
            </button>
          </div>

          <!-- Category chip cloud -->
          <div v-if="categories.length" class="flex items-start gap-3">
            <span class="text-xs text-slate-500 mt-1">Категории:</span>
            <div class="flex-1 overflow-x-auto no-scrollbar">
              <div class="flex gap-2 min-w-max">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  @click="toggleCategory(cat)"
                  :class="[
                    'px-3 py-1 rounded-full text-xs border transition',
                    selectedCategory === cat
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  ]"
                >
                  {{ cat }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loader skeleton -->
      <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="n in 6" :key="n" class="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-slate-200" />
            <div class="flex-1">
              <div class="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div class="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
          <div class="h-3 bg-slate-200 rounded w-full mb-2" />
          <div class="h-3 bg-slate-200 rounded w-5/6 mb-4" />
          <div class="flex justify-between items-center">
            <div class="h-6 bg-slate-200 rounded w-24" />
            <div class="h-8 bg-slate-200 rounded w-24" />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!sortedWorks.length" class="text-center py-20">
        <div class="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 grid place-content-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6a3 3 0 0 1 3-3h8.382a3 3 0 0 1 2.122.879l3.617 3.617A3 3 0 0 1 21 9.618V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold">Ничего не найдено</h3>
        <p class="text-slate-500 text-sm">Попробуйте изменить фильтры или сбросить их.</p>
      </div>

      <!-- Grid of cards -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="work in sortedWorks"
          :key="work.id"
          class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
        >
          <div class="flex items-start gap-3">
            <!-- Avatar -->
            <div v-if="hasAvatar(work.owner_avatar)">
              <img :src="work.owner_avatar" alt="avatar" class="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-100" />
            </div>
            <div v-else class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-content-center font-bold">
              {{ getInitials(work.owner_first_name, work.owner_last_name) }}
            </div>

            <!-- Title + meta -->
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-slate-900 leading-snug truncate" :title="work.title">
                {{ work.title }}
              </h3>
              <div class="text-xs text-slate-500 truncate">
                {{ work.category }} • {{ formatDate(work.created_at) }}
              </div>
            </div>

            <!-- Status pill -->
            <span :class="statusPillClass(work.status)" class="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold">
              {{ statusLabel(work.status) }}
            </span>
          </div>

          <!-- Description -->
          <p class="mt-3 text-sm text-slate-700 line-clamp-3">
            {{ work.description || '—' }}
          </p>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between">
            <div class="text-emerald-600 font-semibold">
              {{ formatPrice(work.price) }}
            </div>
            <button
              @click="openModal(work)"
              class="px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition"
            >
              Подробнее
            </button>
          </div>
        </article>
      </div>
    </main>

    <!-- Modal -->
    <div v-if="showModal && selectedWork" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl ring-1 ring-slate-200 overflow-hidden animate-fade-in">
        <!-- Close -->
        <button @click="closeModal" class="absolute top-4 right-4 size-9 grid place-content-center rounded-full bg-white text-slate-500 shadow hover:text-emerald-600">
          ×
        </button>

        <div class="p-6 sm:p-8 grid gap-6">
          <!-- Header -->
          <div class="flex items-start gap-4">
            <div v-if="hasAvatar(selectedWork.owner_avatar)">
              <img :src="selectedWork.owner_avatar" class="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-50" alt="avatar" />
            </div>
            <div v-else class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 grid place-content-center font-bold text-xl">
              {{ getInitials(selectedWork.owner_first_name, selectedWork.owner_last_name) }}
            </div>
            <div class="min-w-0">
              <h2 class="text-lg sm:text-xl font-bold">{{ selectedWork.title }}</h2>
              <div class="text-xs text-slate-500">
                {{ selectedWork.category }} • Автор: {{ selectedWork.owner_first_name }} {{ selectedWork.owner_last_name }}
              </div>
            </div>
            <span :class="statusPillClass(selectedWork.status)" class="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold">
              {{ statusLabel(selectedWork.status) }}
            </span>
          </div>

          <!-- Body -->
          <div class="grid sm:grid-cols-2 gap-6">
            <section>
              <h3 class="text-sm font-semibold text-slate-700 mb-1">Описание</h3>
              <p class="text-sm text-slate-800 whitespace-pre-line">
                {{ selectedWork.description || '—' }}
              </p>
            </section>
            <section>
              <h3 class="text-sm font-semibold text-slate-700 mb-1">Требования</h3>
              <p class="text-sm text-slate-800 whitespace-pre-line">
                {{ selectedWork.requirements || '—' }}
              </p>
            </section>
          </div>

          <!-- Details -->
          <div class="grid sm:grid-cols-4 gap-4 text-sm">
            <div class="p-3 rounded-2xl bg-slate-50">
              <div class="text-slate-500 text-xs">Бюджет</div>
              <div class="font-semibold">{{ formatPrice(selectedWork.price) }}</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50">
              <div class="text-slate-500 text-xs">Срок</div>
              <div class="font-semibold">
                {{ selectedWork.deadline }} дн.
                <span v-if="getDaysLeft(selectedWork)" :class="getDaysLeft(selectedWork).includes('Просрочено') ? 'text-rose-600' : 'text-emerald-600'" class="font-bold ml-1">
                  {{ getDaysLeft(selectedWork) }}
                </span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50">
              <div class="text-slate-500 text-xs">Создано</div>
              <div class="font-semibold">{{ formatDate(selectedWork.created_at) }}</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50">
              <div class="text-slate-500 text-xs">Категория</div>
              <div class="font-semibold truncate">{{ selectedWork.category }}</div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-2">
            <button @click="closeModal" class="px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
              Назад
            </button>
            <button @click="() => alert('Переход в чат / написать пользователю')"
                    class="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">
              Написать
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

/** ===== State ===== */
const works = ref([])
const loading = ref(false)

const search = ref('')
const sortOrder = ref('newest') // newest | price_asc | price_desc
const selectedCategory = ref('')
const selectedStatus = ref('')  // '' | pending | in_progress | completed (нормализуется)

/** ===== Modal ===== */
const selectedWork = ref(null)
const showModal = ref(false)

/** ===== Status normalization (ровно 3 статуса) ===== */
function normStatus(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+|-/g, '_')
}

const STATUS_MAP = {
  pending:      { label: 'В ожидании', class: 'text-amber-700 bg-amber-50 border-amber-200' },
  'в_ожидании': { label: 'В ожидании', class: 'text-amber-700 bg-amber-50 border-amber-200' },

  in_progress:  { label: 'В работе',    class: 'text-sky-700 bg-sky-50 border-sky-200' },
  'в_работе':   { label: 'В работе',    class: 'text-sky-700 bg-sky-50 border-sky-200' },

  completed:    { label: 'Завершено',   class: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  завершено:    { label: 'Завершено',   class: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
}

function statusLabel(s) {
  const key = normStatus(s)
  return STATUS_MAP[key]?.label ?? 'Неизвестно'
}
function statusPillClass(s) {
  const key = normStatus(s)
  return `border ${STATUS_MAP[key]?.class ?? 'text-slate-600 bg-slate-50 border-slate-200'}`
}

const statusTabs = [
  { value: '',            label: 'Все' },
  { value: 'pending',     label: 'В ожидании' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'completed',   label: 'Завершено' },
]

/** ===== Fetch ===== */
const fetchWorks = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('http://localhost:8000/api/works/')
    works.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error(e)
    works.value = []
  } finally {
    loading.value = false
  }
}
onMounted(fetchWorks)

/** ===== Derived ===== */
const categories = computed(() => [...new Set(works.value.map(w => w.category).filter(Boolean))])

const filteredWorks = computed(() => {
  let list = Array.isArray(works.value) ? [...works.value] : []

  // search across title + category
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter(w =>
      (w.title && String(w.title).toLowerCase().includes(q)) ||
      (w.category && String(w.category).toLowerCase().includes(q))
    )
  }

  if (selectedCategory.value) {
    list = list.filter(w => w.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    list = list.filter(w => {
      const key = normStatus(w.status)
      // допускаем русские синонимы входящих
      if (selectedStatus.value === 'pending')     return key === 'pending' || key === 'в_ожидании'
      if (selectedStatus.value === 'in_progress') return key === 'in_progress' || key === 'в_работе'
      if (selectedStatus.value === 'completed')   return key === 'completed' || key === 'завершено'
      return true
    })
  }

  return list
})

const sortedWorks = computed(() => {
  const list = [...filteredWorks.value]
  if (sortOrder.value === 'price_asc') {
    return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
  }
  if (sortOrder.value === 'price_desc') {
    return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
  }
  // newest by created_at
  return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

/** ===== Helpers ===== */
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU')
}
function formatPrice(value) {
  if (typeof value !== 'number') return '—'
  return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })
}
function getDaysLeft(work) {
  if (!work?.created_at || !work?.deadline) return ''
  const created = new Date(work.created_at)
  const deadlineDate = new Date(created)
  deadlineDate.setDate(deadlineDate.getDate() + Number(work.deadline))
  const now = new Date()
  const diff = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24))
  if (diff > 0) return `Осталось: ${diff} дн.`
  if (diff === 0) return 'Сегодня последний день'
  return `Просрочено на ${Math.abs(diff)} дн.`
}
function getInitials(first, last) {
  return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase() || 'U'
}
function hasAvatar(src) {
  return !!(src && typeof src === 'string' && src.trim() !== '')
}
function openModal(work) {
  selectedWork.value = work
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  selectedWork.value = null
}
function toggleCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
}
function resetFilters() {
  search.value = ''
  sortOrder.value = 'newest'
  selectedCategory.value = ''
  selectedStatus.value = ''
}
function statusCount(val) {
  if (!val) return works.value.length
  return works.value.filter(w => {
    const key = normStatus(w.status)
    if (val === 'pending')     return key === 'pending' || key === 'в_ожидании'
    if (val === 'in_progress') return key === 'in_progress' || key === 'в_работе'
    if (val === 'completed')   return key === 'completed' || key === 'завершено'
    return false
  }).length
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
.animate-fade-in { animation: fadeInUp .25s cubic-bezier(.4,0,.2,1); }
</style>
