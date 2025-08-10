<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// ---------- Категории ----------
const categories = [
  { name: 'Ремонт и строительство', sub: ['Сантехнические работы','Электромонтажные работы','Малярные и штукатурные работы','Сборка мебели','Отделочные работы','Установка дверей и замков','Демонтаж','Строительство домов'] },
  { name: 'Грузоперевозки', sub: ['Квартирный переезд','Офисный переезд','Услуги грузчиков','Междугородние перевозки'] },
  { name: 'Курьерские услуги', sub: ['Доставка документов','Экспресс-доставка','Курьер на день','Доставка еды'] },
  { name: 'Уборка и помощь по хозяйству', sub: ['Генеральная уборка','Уборка после ремонта','Мытьё окон','Помощь по дому','Уход за животными'] },
  { name: 'Ремонт цифровой техники', sub: ['Ремонт компьютеров','Ремонт телефонов','Ремонт бытовой техники'] },
  { name: 'Дизайн', sub: ['Веб-дизайн','Логотипы','Баннеры','Дизайн презентаций','UI/UX'] },
  { name: 'Разработка', sub: ['Сайты','Мобильные приложения','Боты','CRM','API','Парсеры'] },
  { name: 'Фото, видео, аудио', sub: ['Фотосъёмка','Видеомонтаж','Звукорежиссура','Дикторские услуги'] },
  { name: 'Тексты и переводы', sub: ['Копирайтинг','Редактура','Рерайт','Переводы','Написание резюме'] },
  { name: 'Красота и здоровье', sub: ['Массаж','Парикмахерские услуги','Маникюр и педикюр','Косметология'] },
  { name: 'Репетиторы и обучение', sub: ['Английский язык','Математика','Музыка','Спорт','Школьные предметы'] },
  { name: 'Мероприятия и праздники', sub: ['Организация мероприятий','Ведущий','Музыканты','Аниматоры','Декор'] }
]

// ---------- Шаги ----------
const steps = [
  { label: 'Основное' },
  { label: 'Описание' },
  { label: 'Материалы' },
  { label: 'Публикация' }
]
const currentStep = ref(1)
const prevDirection = ref('forward')

// ---------- Состояние формы ----------
const selectedCategory = ref('')
const selectedSubcategory = ref('')
const workTitle = ref('')
const tags = ref([])            // массив тегов
const tagInput = ref('')        // текущее значение ввода тегов

const description = ref('')
const requirements = ref('')    // требования к исполнителю
const deadline = ref(3)
const minPrice = 500
const maxPrice = 100000
const price = ref(5000)

const images = ref([])          // [{name, src, file}]
const files = ref([])           // [File]
const isDragging = ref(false)

const errorMsg = ref('')

// ---------- Вычисления ----------
const availableSubcategories = computed(() => {
  const cat = categories.find(c => c.name === selectedCategory.value)
  return cat ? cat.sub : []
})
const categoryHint = computed(() => selectedCategory.value ? '' : 'Сначала выберите категорию')
const subcategoryHint = computed(() => selectedCategory.value && !selectedSubcategory.value ? 'Теперь выберите подкатегорию' : '')
const canNext = computed(() => {
  if (currentStep.value === 1) return selectedCategory.value && selectedSubcategory.value && workTitle.value
  if (currentStep.value === 2) return description.value && requirements.value && deadline.value && price.value >= minPrice && price.value <= maxPrice
  return true
})
const progress = computed(() => Math.round((currentStep.value - 1) / (steps.length - 1) * 100))

// ---------- Навигация ----------
function nextStep(){ if (currentStep.value < steps.length && canNext.value) { prevDirection.value='forward'; currentStep.value++ } }
function prevStep(){ if (currentStep.value > 1) { prevDirection.value='back'; currentStep.value-- } }

// ---------- Поля / хелперы ----------
function onPriceInput(e){
  let val = parseInt(e.target.value)
  if (isNaN(val)) val = minPrice
  if (val < minPrice) val = minPrice
  if (val > maxPrice) val = maxPrice
  price.value = val
}
function setBudget(v){ price.value = Math.min(Math.max(v, minPrice), maxPrice) }
function setDeadline(v){ deadline.value = Math.min(Math.max(v, 1), 30) }

// Теги (по Enter / запятой / Tab)
function onTagKey(e){
  if (['Enter', ',', 'Tab'].includes(e.key)) {
    e.preventDefault()
    const v = tagInput.value.trim().replace(/,$/, '')
    if (v && !tags.value.includes(v)) tags.value.push(v)
    tagInput.value = ''
  }
}
function removeTag(idx){ tags.value.splice(idx, 1) }

// Галерея
function onImageChange(e){
  addImages(Array.from(e.target.files || []))
  e.target.value = null
}
function handleDrop(ev){
  isDragging.value = false
  addImages(Array.from(ev.dataTransfer?.files || []))
}
function addImages(filesList){
  for (const file of filesList){
    if (!file.type.startsWith('image/')) continue
    if (images.value.length >= 6) break
    const reader = new FileReader()
    reader.onload = ev => images.value.push({ name: file.name, src: ev.target.result, file })
    reader.readAsDataURL(file)
  }
}
function removeImage(idx){ images.value.splice(idx, 1) }

function onFileChange(e){
  for (const f of e.target.files) {
    if (f.type.startsWith('image/')) continue
    files.value.push(f)
  }
  e.target.value = null
}
function removeFile(idx){ files.value.splice(idx, 1) }

// ---------- Отправка ----------
async function publish(){
  errorMsg.value = ''
  const token = localStorage.getItem('access')
  if (!token) { router.push('/login'); return }
  const data = {
    title: workTitle.value,
    category: selectedCategory.value,
    subcategory: selectedSubcategory.value,
    description: description.value,
    requirements: requirements.value,
    deadline: deadline.value,
    price: price.value,
    tags: tags.value
  }
  try{
    const res = await fetch('http://localhost:8000/api/works/create/', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/profile')
    else {
      const err = await res.json()
      errorMsg.value = err.detail || 'Ошибка создания заказа'
    }
  }catch{
    errorMsg.value = 'Ошибка соединения с сервером'
  }
}

// ---------- Утилиты ----------
function fmtPrice(v){
  return typeof v === 'number'
    ? v.toLocaleString('ru-RU', { style:'currency', currency:'RUB', maximumFractionDigits:0 })
    : '—'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
    <!-- Header -->
    <header class="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl sm:text-2xl font-bold tracking-tight">
          Создание <span class="text-emerald-600">задания</span> для исполнителей
        </h1>
        <div class="hidden sm:flex items-center gap-3">
          <div class="h-2 w-44 bg-slate-200/70 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 transition-all duration-500" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="text-sm text-slate-500 tabular-nums">{{ progress }}%</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_380px] gap-8">
      <!-- Form -->
      <section class="rounded-3xl bg-white/80 ring-1 ring-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
        <!-- Stepper -->
        <div class="px-6 sm:px-8 pt-6">
          <div class="flex flex-wrap items-center gap-2">
            <div v-for="(s,i) in steps" :key="s.label" class="flex items-center gap-2">
              <div class="px-3 py-1 rounded-full text-xs font-semibold"
                   :class="i+1<=currentStep ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'">
                {{ i+1 }}. {{ s.label }}
              </div>
              <div v-if="i!==steps.length-1" class="w-8 h-px bg-slate-200"></div>
            </div>
          </div>
        </div>

        <Transition :name="prevDirection === 'forward' ? 'slide' : 'slide-back'" mode="out-in" appear>
          <div :key="currentStep" class="px-6 sm:px-8 py-6 grid gap-6">
            <!-- STEP 1 -->
            <template v-if="currentStep === 1">
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold text-slate-600 mb-1">
                    Название заказа <span class="text-rose-500">*</span>
                  </label>
                  <input
                    v-model="workTitle"
                    type="text"
                    placeholder="Например: Нужен дизайн сайта для стоматологии"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Категория <span class="text-rose-500">*</span></label>
                  <select
                    v-model="selectedCategory"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  >
                    <option disabled value="">Выберите категорию</option>
                    <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
                  </select>
                  <p class="text-xs text-slate-400 mt-1">{{ categoryHint }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Подкатегория <span class="text-rose-500">*</span></label>
                  <select
                    v-model="selectedSubcategory" :disabled="!selectedCategory"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 disabled:opacity-60"
                  >
                    <option disabled value="">Выберите подкатегорию</option>
                    <option v-for="sub in availableSubcategories" :key="sub" :value="sub">{{ sub }}</option>
                  </select>
                  <p class="text-xs text-slate-400 mt-1">{{ subcategoryHint }}</p>
                </div>

                <!-- Tags -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Теги (по Enter/запятой)</label>
                  <div class="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                    <span
                      v-for="(tag, idx) in tags" :key="tag + idx"
                      class="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-200"
                    >
                      #{{ tag }}
                      <button class="text-emerald-600 hover:text-emerald-800" @click="removeTag(idx)" title="Убрать">×</button>
                    </span>
                    <input
                      v-model="tagInput" @keydown="onTagKey" type="text"
                      placeholder="дизайн, ремонт, перевод..."
                      class="flex-1 min-w-[140px] py-1 text-sm outline-none bg-transparent"
                    />
                  </div>
                  <p class="text-xs text-slate-400 mt-1">Теги помогут подходящим исполнителям быстрее найти ваш заказ.</p>
                </div>
              </div>
            </template>

            <!-- STEP 2 -->
            <template v-else-if="currentStep === 2">
              <div class="grid gap-6">
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">
                    Что нужно сделать <span class="text-rose-500">*</span>
                  </label>
                  <textarea
                    v-model="description" rows="6"
                    placeholder="Цель, объём работ, ожидаемый результат, ссылки/референсы."
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">
                    Требования к исполнителю <span class="text-rose-500">*</span>
                  </label>
                  <textarea
                    v-model="requirements" rows="4"
                    placeholder="Опыт, стек/навыки, сроки отклика. Что указать в предложении (срок, цена, примеры работ)."
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="block text-sm font-semibold text-slate-600">Желаемый срок (дней)</label>
                      <div class="flex gap-1">
                        <button @click="setDeadline(3)"  class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">3</button>
                        <button @click="setDeadline(7)"  class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">7</button>
                        <button @click="setDeadline(14)" class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">14</button>
                      </div>
                    </div>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <input type="range" min="1" max="30" v-model="deadline" class="w-full accent-emerald-500" />
                      <div class="flex justify-between text-xs text-slate-400 mt-1">
                        <span>1</span><span>{{ deadline }} дн.</span><span>30</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="block text-sm font-semibold text-slate-600">Бюджет</label>
                      <div class="flex gap-1">
                        <button @click="setBudget(3000)"  class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">3 000 ₽</button>
                        <button @click="setBudget(10000)" class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">10 000 ₽</button>
                        <button @click="setBudget(30000)" class="text-xs px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200">30 000 ₽</button>
                      </div>
                    </div>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-3">
                      <input type="range" :min="minPrice" :max="maxPrice" v-model="price" class="flex-1 accent-emerald-500" step="100" />
                      <input type="number" v-model="price" :min="minPrice" :max="maxPrice" @input="onPriceInput" class="w-28 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400" />
                      <span class="text-sm text-slate-500">₽</span>
                    </div>
                    <div class="flex justify-between text-xs text-slate-400 mt-1">
                      <span>{{ minPrice.toLocaleString() }} ₽</span>
                      <span>{{ maxPrice.toLocaleString() }} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- STEP 3 -->
            <template v-else-if="currentStep === 3">
              <div class="grid gap-6">
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-2">Референсы (изображения, до 6)</label>
                  <div
                    class="rounded-3xl border-2 border-dashed transition"
                    :class="isDragging ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 bg-white'"
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleDrop"
                  >
                    <div class="px-6 py-10 text-center">
                      <div class="mx-auto mb-3 w-12 h-12 rounded-2xl bg-emerald-500/10 grid place-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z"/><path d="M5 19a2 2 0 0 1-2-2V9a1 1 0 1 1 2 0v8h14V9a1 1 0 1 1 2 0v8a2 2 0 0 1-2 2H5Z"/></svg>
                      </div>
                      <p class="text-sm text-slate-600">
                        Перетащите сюда файлы или
                        <label class="text-emerald-600 font-semibold cursor-pointer hover:underline">
                          выберите
                          <input type="file" accept="image/*" class="hidden" multiple @change="onImageChange" />
                        </label>
                      </p>
                      <p class="text-xs text-slate-400 mt-1">JPEG/PNG/WebP, до 6 изображений</p>
                    </div>
                  </div>

                  <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div v-for="(img, idx) in images" :key="img.name + idx" class="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 group">
                      <img :src="img.src" :alt="img.name" class="w-full h-28 object-cover" />
                      <button
                        @click="removeImage(idx)"
                        class="absolute top-2 right-2 w-8 h-8 grid place-content-center rounded-full bg-white/90 text-rose-600 shadow hover:bg-white"
                        title="Удалить"
                      >×</button>
                    </div>
                  </div>
                  <p v-if="images.length" class="text-xs text-slate-400 mt-2">Изображения пока не отправляются на сервер (демо).</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-2">Файлы (ТЗ, бриф, архивы) — опционально</label>
                  <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z"/><path d="M5 19a2 2 0 0 1-2-2V9a1 1 0 1 1 2 0v8h14V9a1 1 0 1 1 2 0v8a2 2 0 0 1-2 2H5Z"/></svg>
                      <span class="text-sm">Загрузить файлы</span>
                      <input type="file" class="hidden" multiple @change="onFileChange" />
                    </label>
                    <span v-for="(file, idx) in files" :key="file.name + idx" class="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs">
                      {{ file.name }}
                      <button @click="removeFile(idx)" class="text-rose-500 hover:text-rose-600" title="Удалить">×</button>
                    </span>
                  </div>
                </div>
              </div>
            </template>

            <!-- STEP 4 -->
            <template v-else-if="currentStep === 4">
              <div class="grid gap-4 text-center">
                <div class="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 grid place-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12.75 7.5 11.25a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l7-7a.75.75 0 1 0-1.06-1.06L9 12.75Z"/></svg>
                </div>
                <h2 class="text-2xl font-bold">Почти готово 🎉</h2>
                <p class="text-slate-600">
                  Проверьте данные. После публикации исполнители увидят ваш заказ и смогут откликнуться.
                </p>
              </div>
            </template>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-2">
              <button v-if="currentStep > 1" @click="prevStep" class="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition">
                Назад
              </button>
              <div class="flex-1" />
              <button v-if="currentStep < steps.length" @click="nextStep" :disabled="!canNext"
                      class="px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition disabled:opacity-50">
                Дальше
              </button>
              <button v-else @click="publish" class="px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition">
                Опубликовать заказ
              </button>
            </div>

            <p v-if="errorMsg" class="text-rose-600 text-sm text-center">{{ errorMsg }}</p>
          </div>
        </Transition>
      </section>

      <!-- Sidebar summary -->
      <aside class="space-y-4">
        <div class="sticky top-24 rounded-3xl bg-white/70 ring-1 ring-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="text-sm font-semibold text-slate-600">Сводка заказа</h3>
          </div>
          <div class="p-5 grid gap-4 text-sm">
            <div>
              <div class="text-slate-400">Название</div>
              <div class="font-semibold text-slate-800">{{ workTitle || '—' }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="text-slate-400">Категория</div>
                <div class="font-medium">{{ selectedCategory || '—' }}</div>
              </div>
              <div>
                <div class="text-slate-400">Подкатегория</div>
                <div class="font-medium">{{ selectedSubcategory || '—' }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="text-slate-400">Бюджет</div>
                <div class="font-semibold text-emerald-700">{{ fmtPrice(price) }}</div>
              </div>
              <div>
                <div class="text-slate-400">Срок</div>
                <div class="font-semibold">{{ deadline }} дн.</div>
              </div>
            </div>
            <div v-if="tags.length" class="flex flex-wrap gap-2">
              <span v-for="(t,i) in tags.slice(0,6)" :key="t+i" class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">#{{ t }}</span>
              <span v-if="tags.length>6" class="text-xs text-slate-500">+{{ tags.length-6 }}</span>
            </div>

            <div v-if="images.length" class="grid grid-cols-3 gap-2">
              <img v-for="(img, i) in images.slice(0,3)" :key="i" :src="img.src" class="h-16 w-full object-cover rounded-xl ring-1 ring-slate-200" />
            </div>

            <div class="text-xs text-slate-500">
              Совет: конкретика по результату и 1–3 референса повышают качество откликов.
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active,
.slide-back-enter-active, .slide-back-leave-active {
  transition: all .45s cubic-bezier(.2,.9,.2,1);
}
.slide-enter-from { opacity: 0; transform: translateY(14px) scale(.98); }
.slide-leave-to   { opacity: 0; transform: translateY(-14px) scale(.98); }
.slide-back-enter-from { opacity: 0; transform: translateY(-14px) scale(.98); }
.slide-back-leave-to   { opacity: 0; transform: translateY(14px) scale(.98); }
</style>
