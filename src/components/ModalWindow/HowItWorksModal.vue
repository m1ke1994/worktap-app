<script setup>
import { defineEmits } from 'vue';
const emit=defineEmits(['close'])
</script>
<!-- HowItWorksModal.vue -->
<template>
  <!-- overlay -->
  <div @click.self="emit('close')" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <!-- modal -->
    <div
      class="relative w-[90%] max-w-5xl rounded-xl bg-white px-6 py-8 sm:px-10 sm:py-12 shadow-2xl"
    >
      <!-- close button -->
      <button  @click="emit('close')"
       
        class="absolute right-4 top-4 text-2xl leading-none text-gray-400 transition hover:text-gray-600"
        aria-label="Закрыть"
      >
        &times;
      </button>

      <!-- title -->
      <h2 class="mb-10 text-center text-2xl font-semibold sm:text-3xl">
        Как это работает
      </h2>

      <!-- steps grid -->
      <div
        class="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0"
      >
        <!-- step 1 -->
        <div class="flex flex-col items-center text-center">
          <img
            src="/assets/step-1.png"
            alt="Категории"
            class="mb-4 h-24 w-auto shrink-0 sm:h-28"
          />
          <h3 class="mb-1 font-semibold">Укажите вид работы и категорию</h3>
        </div>

        <!-- step 2 -->
        <div class="flex flex-col items-center text-center">
          <img
            src="/assets/step-2.png"
            alt="Выбор специалиста"
            class="mb-4 h-24 w-auto shrink-0 sm:h-28"
          />
          <h3 class="mb-1 font-semibold">Выберите специалиста</h3>
          <p class="text-sm text-gray-600">
            Каждый специалист перед&nbsp;началом работы проходит тщательную
            проверку, имеет рейтинг и&nbsp;отзывы предыдущих заказчиков.
          </p>
        </div>

        <!-- step 3 -->
        <div class="flex flex-col items-center text-center">
          <img
            src="/assets/step-3.png"
            alt="Оплата"
            class="mb-4 h-24 w-auto shrink-0 sm:h-28"
          />
          <h3 class="mb-1 font-semibold">Оплатите услугу</h3>
        </div>

        <!-- step 4 -->
        <div class="flex flex-col items-center text-center">
          <img
            src="/assets/step-4.png"
            alt="Выполнение работы"
            class="mb-4 h-24 w-auto shrink-0 sm:h-28"
          />
          <h3 class="mb-1 font-semibold">
            Специалист выполняет&nbsp;работу
          </h3>
          <p class="text-sm text-gray-600">
            После выполнения заказа у&nbsp;вас будет возможность&nbsp;поставить
            специалисту оценку и&nbsp;написать отзыв.
          </p>
        </div>
      </div>

      <!-- confirm button -->
      <div class="mt-12 flex justify-center">
        <button @click="emit('close')"
        
          class="rounded-full bg-green-500 px-10 py-3 text-white transition hover:bg-green-600 active:bg-green-700"
        >
          Понятно
        </button>
      </div>
    </div>
  </div>
</template>

