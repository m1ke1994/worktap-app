<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Основные' },
  { label: 'Описание' },
  { label: 'Галерея' },
  { label: 'Публикация' }
]
const currentStep = ref(2)

const description = ref('')
const advantages = ref(['']) // преимущества (по желанию)
const requirements = ref('')

function addAdvantage() {
  advantages.value.push('')
}
function removeAdvantage(idx) {
  advantages.value.splice(idx, 1)
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

    <div class="w-[933px] bg-white rounded-xl p-8 shadow border border-gray-100">
      <h2 class="font-bold text-2xl mb-6 text-[#473d69]">Опишите свой кворк</h2>

      <!-- Описание -->
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

      <!-- Преимущества -->
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

      <!-- Требования к заказчику -->
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

      <!-- Кнопки -->
      <div class="flex justify-between mt-10">
        <router-link
          to="/create-work"
          class="px-10 py-3 bg-[#f6f2fc] text-[#b895fd] rounded-full font-semibold hover:bg-[#ede8fc] transition"
        >Назад</router-link>
        <router-link
          to="/create-work-step-3"
          class="px-10 py-3 bg-[#21c274] text-white rounded-full font-semibold hover:bg-[#1ca563] transition"
          :disabled="!description"
        >Дальше</router-link>
      </div>
    </div>
  </div>
</template>
