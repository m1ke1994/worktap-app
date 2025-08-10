<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
    <!-- Top bar -->
    <header class="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl sm:text-2xl font-bold tracking-tight">
          Опубликовать услугу
          <span class="text-emerald-600">для заказчиков</span>
        </h1>
        <div class="hidden sm:flex items-center gap-3">
          <div class="h-2 w-40 bg-slate-200/70 rounded-full overflow-hidden">
            <div
              class="h-full bg-emerald-500 transition-all duration-500"
              :style="{ width: progress + '%' }"
            />
          </div>
          <span class="text-sm tabular-nums text-slate-500">{{ progress }}%</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_420px] gap-8">
      <!-- Form card -->
      <div class="rounded-3xl shadow-xl shadow-slate-200/60 bg-white/80 ring-1 ring-slate-200 overflow-hidden">
        <!-- Stepper -->
        <div class="px-6 sm:px-8 pt-6">
          <div class="flex items-center justify-between gap-2">
            <template v-for="(s, i) in steps" :key="s.label">
              <div class="flex items-center gap-2 flex-1">
                <div
                  class="size-9 rounded-full grid place-content-center text-sm font-semibold"
                  :class="i + 1 <= currentStep ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-200 text-slate-500'"
                >
                  {{ i + 1 }}
                </div>
                <div class="hidden sm:block text-sm font-medium" :class="i + 1 <= currentStep ? 'text-slate-900' : 'text-slate-400'">
                  {{ s.label }}
                </div>
              </div>
              <div
                v-if="i !== steps.length - 1"
                class="h-px flex-1 bg-gradient-to-r"
                :class="i + 1 < currentStep ? 'from-emerald-400 to-emerald-500' : 'from-slate-200 to-slate-200'"
              />
            </template>
          </div>
        </div>

        <Transition :name="prevDirection === 'forward' ? 'slide' : 'slide-back'" mode="out-in" appear>
          <section :key="currentStep" class="px-6 sm:px-8 pb-6 sm:pb-8 pt-6 grid gap-6">
            <!-- STEP 1 -->
            <template v-if="currentStep === 1">
              <div class="grid gap-6">
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Название услуги <span class="text-rose-500">*</span></label>
                  <input
                    v-model="workTitle"
                    type="text"
                    placeholder="Например: Дизайн продающего лендинга за 5 дней"
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
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
                      v-model="selectedSubcategory"
                      :disabled="!selectedCategory"
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 disabled:opacity-60"
                    >
                      <option disabled value="">Выберите подкатегорию</option>
                      <option v-for="sub in availableSubcategories" :key="sub" :value="sub">{{ sub }}</option>
                    </select>
                    <p class="text-xs text-slate-400 mt-1">{{ subcategoryHint }}</p>
                  </div>
                </div>

                <!-- Tags -->
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Теги (по Enter/запятой)</label>
                  <div class="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                    <span
                      v-for="(tag, idx) in tags"
                      :key="tag + idx"
                      class="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium border border-emerald-200"
                    >
                      #{{ tag }}
                      <button class="text-emerald-600 hover:text-emerald-800" @click="removeTag(idx)" title="Убрать">×</button>
                    </span>
                    <input
                      v-model="tagInput"
                      @keydown="onTagInput"
                      type="text"
                      placeholder="дизайн, верстка, лендинг…"
                      class="flex-1 min-w-[140px] py-1 text-sm outline-none bg-transparent"
                    />
                  </div>
                  <p class="text-xs text-slate-400 mt-1">Теги помогают заказчикам быстрее найти вашу услугу.</p>
                </div>
              </div>
            </template>

            <!-- STEP 2 -->
            <template v-else-if="currentStep === 2">
              <div class="grid gap-6">
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-1">Описание для заказчика <span class="text-rose-500">*</span></label>
                  <textarea
                    v-model="description"
                    rows="6"
                    placeholder="Что конкретно вы сделаете, результат, этапы, что получите на выходе. Можно добавить ссылки на примеры."
                    class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-slate-600 mb-1">Срок выполнения (дней)</label>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <input
                        type="range"
                        min="1"
                        max="30"
                        v-model="deadline"
                        class="w-full accent-emerald-500"
                      />
                      <div class="flex justify-between text-xs text-slate-400 mt-1">
                        <span>1</span><span>{{ deadline }} дн.</span><span>30</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-slate-600 mb-1">Стоимость от</label>
                    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-3">
                      <input
                        type="range"
                        :min="minPrice"
                        :max="maxPrice"
                        v-model="price"
                        class="flex-1 accent-emerald-500"
                        step="100"
                      />
                      <input
                        type="number"
                        v-model="price"
                        :min="minPrice"
                        :max="maxPrice"
                        @input="onPriceInput"
                        class="w-28 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
                      />
                      <span class="text-sm text-slate-500">₽</span>
                    </div>
                    <div class="flex justify-between text-xs text-slate-400 mt-1">
                      <span>{{ minPrice.toLocaleString() }} ₽</span>
                      <span>{{ maxPrice.toLocaleString() }} ₽</span>
                    </div>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-slate-600 mb-1">Почему вам доверять?</label>
                    <textarea
                      v-model="whyMe"
                      rows="4"
                      placeholder="Коротко о преимуществах: подход, гарантия, поддержка, условия."
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-600 mb-1">Опыт</label>
                    <textarea
                      v-model="experience"
                      rows="4"
                      placeholder="Опыт в годах, ключевые проекты/бренды, стек, сертификаты (если есть)."
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </template>

            <!-- STEP 3 -->
            <template v-else-if="currentStep === 3">
              <div class="grid gap-6">
                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-2">Изображения/кейсы (до 6)</label>

                  <!-- Dropzone -->
                  <div
                    class="rounded-3xl border-2 border-dashed"
                    :class="isDragging ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 bg-white'"
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleDrop"
                  >
                    <div class="px-6 py-10 text-center">
                      <div class="mx-auto mb-3 size-12 rounded-2xl bg-emerald-500/10 grid place-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z"/><path d="M5 19a2 2 0 0 1-2-2V9a1 1 0 1 1 2 0v8h14V9a1 1 0 1 1 2 0v8a2 2 0 0 1-2 2H5Z"/></svg>
                      </div>
                      <p class="text-sm text-slate-600">
                        Перетащите файлы сюда или
                        <label class="text-emerald-600 font-semibold cursor-pointer hover:underline">
                          выберите
                          <input type="file" accept="image/*" class="hidden" multiple @change="onImageChange">
                        </label>
                      </p>
                      <p class="text-xs text-slate-400 mt-1">JPEG/PNG/WebP, до 6 изображений</p>
                    </div>
                  </div>

                  <!-- Thumbs -->
                  <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div
                      v-for="(img, idx) in images"
                      :key="img.name + idx"
                      class="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 group"
                    >
                      <img :src="img.src" :alt="img.name" class="w-full h-32 object-cover" />
                      <button
                        @click="removeImage(idx)"
                        class="absolute top-2 right-2 size-8 grid place-content-center rounded-full bg-white/90 text-rose-600 shadow hover:bg-white"
                        title="Удалить"
                      >×</button>
                    </div>
                  </div>
                  <p v-if="images.length" class="text-xs text-slate-400 mt-2">Изображения пока не отправляются на сервер (демо).</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-600 mb-2">Файлы (опционально)</label>
                  <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16a1 1 0 0 1-1-1V8.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 8.4V15a1 1 0 0 1-1 1Z"/><path d="M5 19a2 2 0 0 1-2-2V9a1 1 0 1 1 2 0v8h14V9a1 1 0 1 1 2 0v8a2 2 0 0 1-2 2H5Z"/></svg>
                      <span class="text-sm">Загрузить файлы</span>
                      <input type="file" class="hidden" multiple @change="onFileChange" />
                    </label>
                    <span
                      v-for="(file, idx) in files"
                      :key="file.name + idx"
                      class="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs"
                    >
                      {{ file.name }}
                      <button @click="removeFile(idx)" class="text-rose-500 hover:text-rose-600" title="Удалить">×</button>
                    </span>
                  </div>
                </div>
              </div>
            </template>

            <!-- STEP 4 -->
            <template v-else-if="currentStep === 4">
              <div class="grid gap-6 text-center">
                <div class="mx-auto size-16 rounded-2xl bg-emerald-500/10 grid place-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-7 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12.75 7.5 11.25a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l7-7a.75.75 0 1 0-1.06-1.06L9 12.75Z"/></svg>
                </div>
                <h2 class="text-2xl font-bold">Почти готово 🎉</h2>
                <p class="text-slate-600">
                  Проверьте данные. После публикации заказчики увидят вашу услугу в списке и смогут связаться с вами.
                </p>
              </div>
            </template>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-2">
              <button
                v-if="currentStep > 1"
                @click="prevStep"
                class="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Назад
              </button>
              <div class="flex-1" />
              <button
                v-if="currentStep < steps.length"
                @click="nextStep"
                :disabled="!canNext"
                class="px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition disabled:opacity-50"
              >
                Дальше
              </button>
              <button
                v-else
                @click="publish"
                class="px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
              >
                Опубликовать
              </button>
            </div>

            <p v-if="errorMsg" class="text-rose-600 text-sm text-center">{{ errorMsg }}</p>
          </section>
        </Transition>
      </div>

      <!-- Live Preview -->
      <aside class="space-y-4">
        <div class="rounded-3xl bg-white/70 ring-1 ring-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="text-sm font-semibold text-slate-600">Предпросмотр для заказчика</h3>
          </div>
          <div class="p-5 grid gap-4">
            <div class="flex items-start gap-3">
              <div class="size-11 rounded-full bg-emerald-100 text-emerald-700 grid place-content-center font-bold">
                {{ initials }}
              </div>
              <div class="min-w-0">
                <div class="font-semibold truncate">{{ workTitle || 'Название услуги' }}</div>
                <div class="text-xs text-slate-500">
                  {{ selectedCategory || 'Категория' }} <span v-if="selectedSubcategory">/ {{ selectedSubcategory }}</span>
                </div>
              </div>
              <div class="ml-auto text-right">
                <div class="text-emerald-600 font-semibold">{{ formatPrice(price) }}</div>
                <div class="text-[11px] text-slate-400">от {{ deadline }} дн.</div>
              </div>
            </div>

            <div class="text-sm text-slate-700 line-clamp-4">
              {{ description || 'Короткое описание вашей услуги для заказчика…' }}
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, idx) in tags.slice(0, 6)"
                :key="tag + idx"
                class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs"
              >
                #{{ tag }}
              </span>
              <span v-if="tags.length > 6" class="text-xs text-slate-500">+{{ tags.length - 6 }}</span>
            </div>

            <div v-if="images.length" class="grid grid-cols-3 gap-2">
              <img v-for="(img, i) in images.slice(0,3)" :key="i" :src="img.src" class="h-20 w-full object-cover rounded-xl ring-1 ring-slate-200" />
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-white/70 ring-1 ring-slate-200 p-4 text-sm text-slate-600">
          Подсказка: чёткое название, понятные этапы и 2–3 кейса повышают конверсию откликов.
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

/** ----- Категории ----- */
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

/** ----- Steps ----- */
const steps = [
  { label: 'Основное' },
  { label: 'Описание' },
  { label: 'Портфолио' },
  { label: 'Публикация' }
]
const currentStep = ref(1)
const prevDirection = ref('forward')

/** ----- State ----- */
const workTitle = ref('')
const selectedCategory = ref('')
const selectedSubcategory = ref('')

const tags = ref([])
const tagInput = ref('')

const description = ref('')
const whyMe = ref('')
const experience = ref('')

const deadline = ref(3)
const minPrice = 500
const maxPrice = 100000
const price = ref(5000)

const images = ref([])
const files = ref([])

const isDragging = ref(false)
const errorMsg = ref('')

/** ----- Computed ----- */
const availableSubcategories = computed(() => {
  const cat = categories.find(c => c.name === selectedCategory.value)
  return cat ? cat.sub : []
})
const categoryHint = computed(() => selectedCategory.value ? '' : 'Сначала выберите категорию')
const subcategoryHint = computed(() => selectedCategory.value && !selectedSubcategory.value ? 'Теперь выберите подкатегорию' : '')
const canNext = computed(() => {
  if (currentStep.value === 1) return !!(selectedCategory.value && selectedSubcategory.value && workTitle.value)
  if (currentStep.value === 2) return !!(description.value && deadline.value && price.value >= minPrice && price.value <= maxPrice)
  return true
})
const progress = computed(() => Math.round((currentStep.value - 1) / (steps.length - 1) * 100))

const initials = computed(() => {
  const s = (workTitle.value || 'UX').trim()
  const words = s.split(/\s+/)
  const a = (words[0]?.[0] || 'U').toUpperCase()
  const b = (words[1]?.[0] || 'X').toUpperCase()
  return a + b
})

/** ----- Methods ----- */
function nextStep() {
  if (currentStep.value < steps.length && canNext.value) {
    prevDirection.value = 'forward'
    currentStep.value++
  }
}
function prevStep() {
  if (currentStep.value > 1) {
    prevDirection.value = 'back'
    currentStep.value--
  }
}
function onPriceInput(e) {
  let val = parseInt(e.target.value)
  if (isNaN(val)) val = minPrice
  if (val < minPrice) val = minPrice
  if (val > maxPrice) val = maxPrice
  price.value = val
}
function onTagInput(e) {
  if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
    e.preventDefault()
    const value = tagInput.value.trim().replace(/,$/, '')
    if (value && !tags.value.includes(value)) tags.value.push(value)
    tagInput.value = ''
  }
}
function removeTag(idx) { tags.value.splice(idx, 1) }

function onImageChange(e) {
  const filesList = Array.from(e.target.files || [])
  addImages(filesList)
  e.target.value = null
}
function handleDrop(ev) {
  isDragging.value = false
  const filesList = Array.from(ev.dataTransfer?.files || [])
  addImages(filesList)
}
function addImages(filesList) {
  for (const file of filesList) {
    if (!file.type.startsWith('image/')) continue
    if (images.value.length >= 6) break
    const reader = new FileReader()
    reader.onload = event => {
      images.value.push({ name: file.name, src: event.target.result, file })
    }
    reader.readAsDataURL(file)
  }
}
function removeImage(idx) { images.value.splice(idx, 1) }

function onFileChange(e) {
  for (const file of e.target.files) {
    if (file.type.startsWith('image/')) continue
    files.value.push(file)
  }
  e.target.value = null
}
function removeFile(idx) { files.value.splice(idx, 1) }

/** ----- Submit ----- */
async function publish() {
  errorMsg.value = ''
  const token = localStorage.getItem('access')
  if (!token) {
    router.push('/login')
    return
  }
  const data = {
    title: workTitle.value,
    category: selectedCategory.value,
    subcategory: selectedSubcategory.value,
    description: description.value,
    why_me: whyMe.value,
    experience: experience.value,
    deadline: deadline.value,
    price: price.value,
    tags: tags.value
  }
  try {
    const res = await fetch('http://localhost:8000/api/works/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      router.push('/profile')
    } else {
      const err = await res.json()
      errorMsg.value = err.detail || 'Ошибка создания услуги'
    }
  } catch (e) {
    errorMsg.value = 'Ошибка соединения с сервером'
  }
}

/** ----- Utils ----- */
function formatPrice(v) {
  if (typeof v !== 'number') return '—'
  return v.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })
}
</script>

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
