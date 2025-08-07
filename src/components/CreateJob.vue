<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// Категории (те же, что в заданиях)
const categories = [
  { name: 'Ремонт и строительство', sub: [
      'Сантехнические работы', 'Электромонтажные работы', 'Малярные и штукатурные работы', 'Сборка мебели', 'Отделочные работы', 'Установка дверей и замков', 'Демонтаж', 'Строительство домов'
    ] },
  { name: 'Грузоперевозки', sub: [
      'Квартирный переезд', 'Офисный переезд', 'Услуги грузчиков', 'Междугородние перевозки'
    ] },
  { name: 'Курьерские услуги', sub: [
      'Доставка документов', 'Экспресс-доставка', 'Курьер на день', 'Доставка еды'
    ] },
  { name: 'Уборка и помощь по хозяйству', sub: [
      'Генеральная уборка', 'Уборка после ремонта', 'Мытьё окон', 'Помощь по дому', 'Уход за животными'
    ] },
  { name: 'Ремонт цифровой техники', sub: [
      'Ремонт компьютеров', 'Ремонт телефонов', 'Ремонт бытовой техники'
    ] },
  { name: 'Дизайн', sub: [
      'Веб-дизайн', 'Логотипы', 'Баннеры', 'Дизайн презентаций', 'UI/UX'
    ] },
  { name: 'Разработка', sub: [
      'Сайты', 'Мобильные приложения', 'Боты', 'CRM', 'API', 'Парсеры'
    ] },
  { name: 'Фото, видео, аудио', sub: [
      'Фотосъёмка', 'Видеомонтаж', 'Звукорежиссура', 'Дикторские услуги'
    ] },
  { name: 'Тексты и переводы', sub: [
      'Копирайтинг', 'Редактура', 'Рерайт', 'Переводы', 'Написание резюме'
    ] },
  { name: 'Красота и здоровье', sub: [
      'Массаж', 'Парикмахерские услуги', 'Маникюр и педикюр', 'Косметология'
    ] },
  { name: 'Репетиторы и обучение', sub: [
      'Английский язык', 'Математика', 'Музыка', 'Спорт', 'Школьные предметы'
    ] },
  { name: 'Мероприятия и праздники', sub: [
      'Организация мероприятий', 'Ведущий', 'Музыканты', 'Аниматоры', 'Декор'
    ] }
]

// STEPS
const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Портфолио' },
  { label: 'Публикация' }
]
const currentStep = ref(1)
const prevDirection = ref('forward')

// Основные
const workTitle = ref('')
const selectedCategory = ref('')
const selectedSubcategory = ref('')
const tags = ref([]) // пользователь может вводить через enter или запятую
const tagInput = ref('')

// Описание
const description = ref('')
const whyMe = ref('')
const experience = ref('')
const deadline = ref(3)
const minPrice = 500
const maxPrice = 100000
const price = ref(5000)

// Портфолио
const images = ref([])
const files = ref([])

// Ошибки
const errorMsg = ref('')

// Вычисления
const availableSubcategories = computed(() => {
  const cat = categories.find(c => c.name === selectedCategory.value)
  return cat ? cat.sub : []
})
const categoryHint = computed(() => selectedCategory.value ? '' : 'Сначала выберите категорию')
const subcategoryHint = computed(() => selectedCategory.value && !selectedSubcategory.value ? 'Теперь выберите подкатегорию' : '')
const canNext = computed(() => {
  if (currentStep.value === 1)
    return selectedCategory.value && selectedSubcategory.value && workTitle.value
  if (currentStep.value === 2)
    return description.value && deadline.value && price.value >= minPrice && price.value <= maxPrice
  if (currentStep.value === 3)
    return true
  return true
})

// Методы
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

// Теги (по Enter/запятой)
function onTagInput(e) {
  if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
    e.preventDefault()
    const value = tagInput.value.trim().replace(/,$/, '')
    if (value && !tags.value.includes(value)) tags.value.push(value)
    tagInput.value = ''
  }
}
function removeTag(idx) { tags.value.splice(idx, 1) }

// Галерея (front only)
function onImageChange(e) {
  for (const file of e.target.files) {
    if (!file.type.startsWith('image/')) continue
    if (images.value.length >= 5) break
    const reader = new FileReader()
    reader.onload = event => {
      images.value.push({ name: file.name, src: event.target.result, file })
    }
    reader.readAsDataURL(file)
  }
  e.target.value = null
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

// ОТПРАВКА
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
      errorMsg.value = err.detail || 'Ошибка создания ворка'
    }
  } catch (e) {
    errorMsg.value = 'Ошибка соединения с сервером'
  }
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

    <Transition :name="prevDirection === 'forward' ? 'slider' : 'slider-back'" mode="out-in" appear>
      <div :key="currentStep" class="w-[933px] bg-white rounded-xl p-8 shadow border border-gray-100 space-y-6 transition-all duration-300">
        <!-- Шаг 1: Основные -->
        <template v-if="currentStep === 1">
          <div class="grid grid-cols-2 gap-8">
            <div>
              <label class="block text-gray-500 mb-1 font-semibold">Название ворка <span class="text-red-500">*</span></label>
              <input
                v-model="workTitle"
                type="text"
                placeholder="Например: Верстка лендингов под ключ"
                class="w-full border-b border-gray-200 text-lg py-2 bg-transparent focus:outline-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-8">
              <div>
                <label class="block text-gray-500 mb-1 font-semibold">Категория <span class="text-red-500">*</span></label>
                <select
                  v-model="selectedCategory"
                  class="w-full border-b border-gray-200 py-2 bg-transparent focus:outline-none text-gray-700"
                >
                  <option disabled value="">Выберите категорию</option>
                  <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
                </select>
                <div class="text-xs text-gray-400 mt-1">{{ categoryHint }}</div>
              </div>
              <div>
                <label class="block text-gray-500 mb-1 font-semibold">Подкатегория <span class="text-red-500">*</span></label>
                <select
                  v-model="selectedSubcategory"
                  :disabled="!selectedCategory"
                  class="w-full border-b border-gray-200 py-2 bg-transparent focus:outline-none text-gray-700"
                >
                  <option disabled value="">Выберите подкатегорию</option>
                  <option v-for="sub in availableSubcategories" :key="sub" :value="sub">{{ sub }}</option>
                </select>
                <div class="text-xs text-gray-400 mt-1">{{ subcategoryHint }}</div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-gray-500 mb-1 font-semibold">Теги (через Enter/запятую)</label>
            <div class="flex flex-wrap gap-2 mt-2">
              <span v-for="(tag, idx) in tags" :key="tag" class="bg-[#ece8f8] text-[#7d6dbe] px-3 py-1 rounded-full text-sm flex items-center">
                {{ tag }}
                <button class="ml-2 text-lg leading-none text-red-400 hover:text-red-600" @click="removeTag(idx)">×</button>
              </span>
              <input
                v-model="tagInput"
                @keydown="onTagInput"
                type="text"
                placeholder="Добавить тег"
                class="flex-1 min-w-[120px] border-none outline-none bg-transparent text-sm px-2"
              />
            </div>
            <div class="text-xs text-gray-400 mt-1">Примеры: сайты, ремонт, копирайтинг</div>
          </div>
        </template>

        <!-- Шаг 2: Описание -->
        <template v-if="currentStep === 2">
          <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Описание и условия</h2>
          <div class="mb-8">
            <label class="block text-gray-600 mb-1 font-semibold">Описание услуги <span class="text-red-500">*</span></label>
            <textarea
              v-model="description"
              rows="5"
              placeholder="Опишите, какие услуги вы оказываете и как работаете"
              class="w-full border border-gray-200 rounded-xl p-4 text-base bg-[#faf9fc] focus:outline-none focus:border-[#7d6dbe] transition"
            ></textarea>
          </div>
          <div class="mb-8">
            <label class="block text-gray-600 mb-1 font-semibold">Почему выбрать меня?</label>
            <textarea
              v-model="whyMe"
              rows="3"
              placeholder="Расскажите, чем вы лучше других, ваши плюсы"
              class="w-full border border-gray-200 rounded-xl p-4 text-base bg-[#faf9fc] focus:outline-none focus:border-[#7d6dbe] transition"
            ></textarea>
          </div>
          <div class="mb-8">
            <label class="block text-gray-600 mb-1 font-semibold">Опыт</label>
            <textarea
              v-model="experience"
              rows="3"
              placeholder="Опишите ваш опыт: годы работы, крупные проекты и пр."
              class="w-full border border-gray-200 rounded-xl p-4 text-base bg-[#faf9fc] focus:outline-none focus:border-[#7d6dbe] transition"
            ></textarea>
          </div>
          <div class="mb-8">
            <label class="block text-gray-600 mb-2 font-semibold">Минимальный срок выполнения (дней): <span class="text-[#21c274] font-bold">{{ deadline }}</span></label>
            <input
              type="range"
              min="1"
              max="30"
              v-model="deadline"
              class="w-full accent-[#21c274] h-2"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 день</span>
              <span>30 дней</span>
            </div>
          </div>
          <div>
            <label class="block text-gray-600 mb-2 font-semibold">Цена от (₽): <span class="text-[#21c274] font-bold">{{ price }}</span></label>
            <div class="flex items-center gap-4">
              <input
                type="range"
                :min="minPrice"
                :max="maxPrice"
                v-model="price"
                class="w-full accent-[#21c274] h-2"
                step="100"
              />
              <input
                type="number"
                v-model="price"
                :min="minPrice"
                :max="maxPrice"
                @input="onPriceInput"
                class="w-28 border border-gray-300 rounded-xl px-3 py-2 text-base"
              />
              <span class="text-gray-500 text-sm">₽</span>
            </div>
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>{{ minPrice.toLocaleString() }} ₽</span>
              <span>{{ maxPrice.toLocaleString() }} ₽</span>
            </div>
          </div>
        </template>

        <!-- Шаг 3: Портфолио -->
        <template v-if="currentStep === 3">
          <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Портфолио (опционально)</h2>
          <div class="mb-8">
            <label class="block text-gray-600 mb-2 font-semibold">Изображения работ (до 5 шт)</label>
            <div class="flex flex-wrap gap-4">
              <label
                class="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#ded4f5] rounded-2xl bg-[#f7faff] text-[#b895fd] text-4xl cursor-pointer hover:bg-[#ede8fc] transition"
                v-if="images.length < 5"
              >
                <span>+</span>
                <input type="file" accept="image/*" class="hidden" multiple @change="onImageChange" />
                <span class="text-xs text-gray-400 mt-2">Добавить</span>
              </label>
              <div
                v-for="(img, idx) in images"
                :key="img.name + idx"
                class="w-32 h-32 rounded-2xl overflow-hidden border border-[#ded4f5] relative group"
              >
                <img :src="img.src" :alt="img.name" class="object-cover w-full h-full" />
                <button
                  @click="removeImage(idx)"
                  class="absolute top-1 right-1 bg-white rounded-full text-red-400 px-2 font-bold opacity-80 group-hover:opacity-100 hover:text-red-600 transition"
                  title="Удалить"
                >×</button>
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2">
              (Пока не отправляются на сервер, только для примера)
            </div>
          </div>
          <div class="mb-8">
            <label class="block text-gray-600 mb-2 font-semibold">Файлы (опционально)</label>
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-3" v-for="(file, idx) in files" :key="file.name + idx">
                <span class="text-[#473d69] font-medium">{{ file.name }}</span>
                <button @click="removeFile(idx)" class="text-red-400 hover:text-red-600 text-lg" title="Удалить">×</button>
              </div>
            </div>
            <label class="inline-block mt-3 px-5 py-2 bg-[#f6f2fc] text-[#a181ff] rounded-full font-medium hover:bg-[#ede8fc] transition cursor-pointer">
              + Добавить файл
              <input type="file" class="hidden" multiple @change="onFileChange" />
            </label>
          </div>
        </template>

        <!-- Шаг 4: Публикация -->
        <template v-if="currentStep === 4">
          <div class="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" class="w-24 h-24 mb-6" alt="Готово!" />
            <h2 class="font-bold text-2xl mb-4 text-[#473d69] text-center">Ваш ворк почти готов 🎉</h2>
            <p class="text-gray-600 mb-8 text-center max-w-[500px]">
              Проверьте заполненные данные. После публикации ваш ворк появится в поиске, и заказчики смогут найти вас по нужным параметрам!
            </p>
          </div>
        </template>

        <!-- КНОПКИ НАВИГАЦИИ -->
        <div class="flex justify-between mt-10">
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            class="px-10 py-3 bg-[#f6f2fc] text-[#b895fd] rounded-full font-semibold hover:bg-[#ede8fc] transition"
          >Назад</button>
          <div class="flex-1"></div>
          <button
            v-if="currentStep < steps.length"
            @click="nextStep"
            :disabled="!canNext"
            class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
          >Дальше</button>
          <button
            v-else
            @click="publish"
            class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
          >Опубликовать</button>
        </div>
        <div v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slider-enter-active, .slider-leave-active,
.slider-back-enter-active, .slider-back-leave-active {
  transition: all 0.5s cubic-bezier(.73,.21,.28,.99);
  position: relative;
  z-index: 1;
}
.slider-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.slider-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.slider-back-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.slider-back-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
.slider-enter-to, .slider-leave-from,
.slider-back-enter-to, .slider-back-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
