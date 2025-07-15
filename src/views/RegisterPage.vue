<script setup>
import { ref, onMounted, onUnmounted } from "vue";

/* --- регистрационные данные --- */
const firstName = ref("");
const lastName  = ref("");
const email     = ref("");
const phone     = ref("+7 ");   // то, что видит пользователь
const phoneRaw  = ref("+7");    // «сырое» значение для отправки
const password  = ref("");
const confirm   = ref("");
const role      = ref("executor");

/* форматируем «+79991234567» → «+7 999 123‑45‑67» */
function prettify(raw) {
  const d = raw.slice(2);                       // 10 цифр
  const p = [
    d.slice(0, 3), d.slice(3, 6),
    d.slice(6, 8), d.slice(8, 10),
  ].filter(Boolean);

  return "+7" +
    (p[0] ? " " + p[0] : "") +
    (p[1] ? " " + p[1] : "") +
    (p[2] ? "-" + p[2] : "") +
    (p[3] ? "-" + p[3] : "");
}

/* обработчик ввода телефона */
function onPhoneInput(e) {
  let raw = e.target.value.replace(/[^\d+]/g, ""); // оставляем только + и цифры

  // гарантируем начало +7
  if (!raw.startsWith("+")) raw = "+" + raw;
  if (!raw.startsWith("+7")) raw = "+7" + raw.replace(/^\+?\d*/, "");

  raw = raw.slice(0, 12);        // +7 + 10 цифр = 12 символов

  phoneRaw.value = raw;          // для бэкенда
  phone.value    = prettify(raw);
}

function onRegister() {
  console.log("Register", {
    firstName : firstName.value,
    lastName  : lastName.value,
    email     : email.value,
    phoneRaw  : phoneRaw.value,  // отправлять удобнее это
    password  : password.value,
    confirm   : confirm.value,
    role      : role.value,
  });
}

/* --- слайдер (без изменений) --- */
const slides = [
  "Worktap — это маркетплейс фриланс‑услуг, где можно купить услугу как товар в магазине или создать индивидуальный заказ на бирже.",
  "Тысячи проверенных специалистов готовы взяться за ваш проект прямо сейчас.",
  "Получите результат быстрее: опишите задачу, выберите исполнителя — и всё готово!",
];

const currentIndex = ref(0);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length;
  }, 5000);
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Левая половина: форма -->
    <div class="w-1/2 flex items-center justify-center p-10">
      <div class="w-full max-w-[509px] border-2 border-sky-500 rounded-lg px-8 py-6">
        <p class="text-xs text-gray-500">Давайте создадим Вам аккаунт</p>
        <h1 class="text-2xl font-bold mb-6">Заполните все поля</h1>

        <form @submit.prevent="onRegister" class="space-y-4">
          <!-- имя -->
          <div>
            <label class="text-sm text-gray-600">Ваше имя</label>
            <input v-model="firstName" type="text" placeholder="Имя" required
                   class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"/>
          </div>
          <!-- фамилия -->
          <div>
            <label class="text-sm text-gray-600">Ваша фамилия</label>
            <input v-model="lastName" type="text" placeholder="Фамилия" required
                   class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"/>
          </div>
          <!-- email -->
          <div>
            <label class="text-sm text-gray-600">E‑mail</label>
            <input v-model="email" type="email" placeholder="E‑mail" required
                   class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"/>
          </div>
          <!-- телефон -->
          <div>
            <label class="text-sm text-gray-600">Телефон номер</label>
            <input
              v-model="phone"
              @input="onPhoneInput"
              type="tel"
              placeholder="+7 999 123‑45‑67"
              maxlength="18"
              pattern="^\\+7\\d{10}$"
              required
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <!-- пароль -->
          <div>
            <label class="text-sm text-gray-600">Пароль</label>
            <input v-model="password" type="password" placeholder="Пароль" required
                   class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"/>
          </div>
          <!-- подтверждение -->
          <div>
            <label class="text-sm text-gray-600">Повторите пароль</label>
            <input v-model="confirm" type="password" placeholder="Пароль" required
                   class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-sky-500"/>
          </div>

          <!-- роль -->
          <div class="flex items-center space-x-6 text-sm">
            <label class="inline-flex items-center">
              <input type="radio" value="executor" v-model="role" class="form-radio accent-sky-500"/>
              <span class="ml-2">Я исполнитель</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" value="customer" v-model="role" class="form-radio accent-sky-500"/>
              <span class="ml-2">Я заказчик</span>
            </label>
          </div>

          <button type="submit"
                  class="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-full">
            Зарегистрироваться
          </button>
        </form>

        <p class="text-center text-xs mt-4 text-gray-600">
          У вас есть аккаунт?
          <router-link to="/login"
                       class="text-orange-500 hover:underline transition-all duration-300">Войти</router-link>
        </p>
      </div>
    </div>

    <!-- Правая половина: фон + слайдер -->
    <div class="w-1/2 relative bg-cover bg-center"
         :style="{ backgroundImage: `url('/assets/bg-login4.png')` }">
      <div class="absolute bottom-10 left-10 right-10 bg-white/90 rounded-lg p-4">
        <p class="text-gray-800 text-sm transition-all duration-300">
          {{ slides[currentIndex] }}
        </p>
        <div class="flex justify-center mt-3">
          <span v-for="(_, i) in slides"
                :key="i"
                class="w-2 h-2 bg-yellow-400 rounded-full mx-1"
                :class="i === currentIndex ? 'opacity-100' : 'opacity-50'"/>
        </div>
      </div>
    </div>
  </div>
</template>

