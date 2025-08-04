<script setup>
import { ref, computed } from 'vue'

const categories = [
  { name: 'Ремонт и строительство', sub: [
      'Сантехнические работы', 'Электромонтажные работы', 'Малярные и штукатурные работы', 'Сборка мебели', 'Отделочные работы', 'Установка дверей и замков', 'Демонтаж', 'Строительство домов'
    ]
  },
  { name: 'Грузоперевозки', sub: [
      'Квартирный переезд', 'Офисный переезд', 'Услуги грузчиков', 'Междугородние перевозки'
    ]
  },
  { name: 'Курьерские услуги', sub: [
      'Доставка документов', 'Экспресс-доставка', 'Курьер на день', 'Доставка еды'
    ]
  },
  { name: 'Уборка и помощь по хозяйству', sub: [
      'Генеральная уборка', 'Уборка после ремонта', 'Мытьё окон', 'Помощь по дому', 'Уход за животными'
    ]
  },
  { name: 'Ремонт цифровой техники', sub: [
      'Ремонт компьютеров', 'Ремонт телефонов', 'Ремонт бытовой техники'
    ]
  },
  { name: 'Дизайн', sub: [
      'Веб-дизайн', 'Логотипы', 'Баннеры', 'Дизайн презентаций', 'UI/UX'
    ]
  },
  { name: 'Разработка', sub: [
      'Сайты', 'Мобильные приложения', 'Боты', 'CRM', 'API', 'Парсеры'
    ]
  },
  { name: 'Фото, видео, аудио', sub: [
      'Фотосъёмка', 'Видеомонтаж', 'Звукорежиссура', 'Дикторские услуги'
    ]
  },
  { name: 'Тексты и переводы', sub: [
      'Копирайтинг', 'Редактура', 'Рерайт', 'Переводы', 'Написание резюме'
    ]
  },
  { name: 'Красота и здоровье', sub: [
      'Массаж', 'Парикмахерские услуги', 'Маникюр и педикюр', 'Косметология'
    ]
  },
  { name: 'Репетиторы и обучение', sub: [
      'Английский язык', 'Математика', 'Музыка', 'Спорт', 'Школьные предметы'
    ]
  },
  { name: 'Мероприятия и праздники', sub: [
      'Организация мероприятий', 'Ведущий', 'Музыканты', 'Аниматоры', 'Декор'
    ]
  },
  // Можно добавить ещё больше категорий по мере необходимости
]

const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(1)

const selectedCategory = ref('')
const selectedSubcategory = ref('')

const availableSubcategories = computed(() => {
  const cat = categories.find(c => c.name === selectedCategory.value)
  return cat ? cat.sub : []
})

// UX: Подсказываем пользователю что делать
const categoryHint = computed(() => selectedCategory.value ? '' : 'Сначала выберите категорию')
const subcategoryHint = computed(() => selectedCategory.value && !selectedSubcategory.value ? 'Теперь выберите подкатегорию' : '')

const workTitle = ref('')
const tags = ref([])

function removeTag(idx) {
  tags.value.splice(idx, 1)
}
</script>

<template>
  <div class="bg-[#f7faff] min-h-screen flex flex-col items-center py-10">
    <!-- Stepper -->
    <div class="w-[933px] bg-white border border-blue-200 rounded-xl p-3 mb-8">
      <div class="flex justify-between items-center relative">
        <div class="absolute left-10 right-10 top-1/2 h-1 bg-[#ded4f5] z-0"></div>
        <div v-for="(step, idx) in steps" :key="idx" class="flex flex-col items-center z-10 w-1/6 cursor-pointer"
             @click="currentStep = idx + 1">
          <div
            class="flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold border-4 transition-all"
            :class="{
              'bg-green-500 text-white border-green-300': currentStep === idx+1,
              'bg-[#c9bbe5] text-white border-[#ded4f5]': currentStep !== idx+1,
            }"
          >{{ idx+1 }}</div>
          <span class="mt-1 text-xs font-medium text-[#6a6e8d] whitespace-nowrap">{{ step.label }}</span>
        </div>
      </div>
    </div>

    <div class="w-[933px] bg-white rounded-xl p-8 space-y-6 shadow border border-gray-100">
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

      <!-- Кнопка Дальше -->
      <div class="pt-4 text-right">
        <router-link
          to="/create-work-step-2"
          class="px-8 py-2 bg-[#1DBF73] hover:bg-[#5b3fc8] text-white font-semibold rounded-full  transition-all duration-300"
          :disabled="!selectedCategory || !selectedSubcategory || !workTitle"
        >
          Дальше
        </router-link>
      </div>
    </div>
  </div>
</template>
