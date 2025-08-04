<script setup>
import { ref, computed } from 'vue'

// СТЕПЫ
const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(1)

// ---------- ДАННЫЕ ДЛЯ ВСЕХ ШАГОВ ----------

// 1. Основные
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
const selectedCategory = ref('')
const selectedSubcategory = ref('')
const availableSubcategories = computed(() => {
  const cat = categories.find(c => c.name === selectedCategory.value)
  return cat ? cat.sub : []
})
const workTitle = ref('')
const tags = ref([])

// 2. Описание
const description = ref('')
const advantages = ref([''])
const requirements = ref('')

// 3. Галерея
const images = ref([])
const files = ref([])

// ---------- МЕТОДЫ ----------

// Теги
function removeTag(idx) { tags.value.splice(idx, 1) }

// Преимущества
function addAdvantage() { advantages.value.push('') }
function removeAdvantage(idx) { advantages.value.splice(idx, 1) }

// Галерея
function onImageChange(e) {
  for (const file of e.target.files) {
    if (!file.type.startsWith('image/')) continue
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

// ---------- НАВИГАЦИЯ ----------
function nextStep() {
  if (currentStep.value < steps.length) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}
function publish() {
  // Тут отправь форму или покажи алерт
  alert('Кворк успешно опубликован!')
}

// UX hints
const categoryHint = computed(() => selectedCategory.value ? '' : 'Сначала выберите категорию')
const subcategoryHint = computed(() => selectedCategory.value && !selectedSubcategory.value ? 'Теперь выберите подкатегорию' : '')

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

    <div class="w-[933px] bg-white rounded-xl p-8 shadow border border-gray-100 transition-all duration-300 space-y-6">
      <!-- 1. Основные -->
      <template v-if="currentStep === 1">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="block text-gray-500 mb-1 font-semibold">Название услуги</label>
            <input
              v-model="workTitle"
              type="text"
              placeholder="Например: Дизайн сайта для стоматологии"
              class="w-full border-b border-gray-200 text-lg py-2 bg-transparent focus:outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <label class="block text-gray-500 mb-1 font-semibold">Категория</label>
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
              <label class="block text-gray-500 mb-1 font-semibold">Подкатегория</label>
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
          <label class="block text-gray-500 mb-1 font-semibold">Теги</label>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tag, idx) in tags" :key="idx" class="flex items-center bg-[#f7f6fc] border border-[#ded4f5] rounded-2xl px-4 py-1 text-[#6a6e8d] text-sm">
              {{ tag }}
              <button @click="removeTag(idx)" class="ml-2 text-[#6a6e8d] hover:text-red-500 font-bold text-xl leading-none focus:outline-none">&times;</button>
            </span>
          </div>
        </div>
      </template>

      <!-- 2. Описание -->
      <template v-if="currentStep === 2">
        <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Опишите свой кворк</h2>
        <div class="mb-8">
          <label class="block text-gray-600 mb-1 font-semibold">Подробное описание<span class="text-red-500 ml-1">*</span></label>
          <textarea
            v-model="description"
            rows="6"
            placeholder="Расскажите, что вы сделаете, как это будет происходить, чем вы отличаетесь от других."
            class="w-full border border-gray-200 rounded-xl p-4 text-base bg-[#faf9fc] focus:outline-none focus:border-[#7d6dbe] transition"
          ></textarea>
          <div class="text-xs text-gray-400 mt-1">
            Например: “Я разработаю современный лендинг с нуля под ключ, учту пожелания по стилю и цветовой гамме. Сдаю работу в срок, всегда на связи…”
          </div>
        </div>
        <div class="mb-8">
          <label class="block text-gray-600 mb-1 font-semibold">Ваши преимущества (по желанию)</label>
          <div class="space-y-2">
            <div v-for="(adv, idx) in advantages" :key="idx" class="flex items-center gap-2">
              <input
                v-model="advantages[idx]"
                type="text"
                class="w-full border-b border-gray-200 py-2 bg-transparent focus:outline-none"
                placeholder="Например: 5 лет опыта / Работаю без предоплаты / Гарантия результата"
              />
              <button
                v-if="advantages.length > 1"
                @click="removeAdvantage(idx)"
                class="text-red-400 hover:text-red-600 text-lg"
                title="Удалить"
              >×</button>
            </div>
          </div>
          <button
            class="mt-2 px-5 py-1 bg-[#f6f2fc] text-[#a181ff] rounded-full font-medium hover:bg-[#ede8fc] transition"
            @click="addAdvantage"
          >Добавить ещё</button>
        </div>
        <div class="mb-8">
          <label class="block text-gray-600 mb-1 font-semibold">Требования к заказчику</label>
          <textarea
            v-model="requirements"
            rows="4"
            placeholder="Что нужно предоставить заказчику для начала работы? Например: ТЗ, тексты, референсы, доступы…"
            class="w-full border border-gray-200 rounded-xl p-4 text-base bg-[#faf9fc] focus:outline-none focus:border-[#7d6dbe] transition"
          ></textarea>
          <div class="text-xs text-gray-400 mt-1">
            Не указывайте персональные контакты — только детали для работы!
          </div>
        </div>
      </template>

      <!-- 3. Галерея -->
      <template v-if="currentStep === 3">
        <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Добавьте изображения и файлы к кворку</h2>
        <div class="mb-8">
          <label class="block text-gray-600 mb-2 font-semibold">Изображения (до 5 шт)</label>
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
            Добавьте фото результата или примеры работ. Максимум 5 файлов.
          </div>
        </div>
        <div class="mb-8">
          <label class="block text-gray-600 mb-2 font-semibold">Документы, примеры, исходники (опционально)</label>
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
          <div class="text-xs text-gray-400 mt-2">
            Вы можете приложить бриф, примеры, инструкции, архивы и т.д.
          </div>
        </div>
      </template>

      <!-- 4. Публикация -->
      <template v-if="currentStep === 4">
        <div class="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            class="w-24 h-24 mb-6"
            alt="Готово!"
          />
          <h2 class="font-bold text-2xl mb-4 text-[#473d69] text-center">Поздравляем! <br>Вы почти опубликовали кворк 🎉</h2>
          <p class="text-gray-600 mb-8 text-center max-w-[500px]">
            Всё готово — проверьте введённые данные. После публикации ваш кворк появится в поиске и станет доступен для заказчиков.
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
          :disabled="
            (currentStep === 1 && (!selectedCategory || !selectedSubcategory || !workTitle)) ||
            (currentStep === 2 && !description) ||
            (currentStep === 3 && images.length === 0)
          "
          class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
        >Дальше</button>
        <button
          v-else
          @click="publish"
          class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
        >Опубликовать</button>
      </div>
    </div>
  </div>
</template>
