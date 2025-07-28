<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";

const router = useRouter();
const userStore = useUserStore();

const firstName = ref("");
const lastName  = ref("");
const email     = ref("");
const phone     = ref("+7 ");
const phoneRaw  = ref("+7");
const password  = ref("");
const confirm   = ref("");
const role      = ref("executor");

const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

const slides = [
  "Worktap — это маркетплейс фриланс‑услуг, где можно купить услугу как товар в магазине или создать индивидуальный заказ на бирже.",
  "Тысячи проверенных специалистов готовы взяться за ваш проект прямо сейчас.",
  "Получите результат быстрее: опишите задачу, выберите исполнителя — и всё готово!"
];
const currentIndex = ref(0);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length;
  }, 5000);
});
onUnmounted(() => clearInterval(interval));

function prettify(raw) {
  const d = raw.slice(2);
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

function onPhoneInput(e) {
  let raw = e.target.value.replace(/[^\d+]/g, "");
  if (!raw.startsWith("+")) raw = "+" + raw;
  if (!raw.startsWith("+7")) raw = "+7" + raw.replace(/^\+?\d*/, "");
  raw = raw.slice(0, 12);
  phoneRaw.value = raw;
  phone.value    = prettify(raw);
}

// ОСНОВНАЯ РЕГИСТРАЦИЯ
async function onRegister() {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  const payload = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    phone: phoneRaw.value,
    password: password.value,
    confirm: confirm.value,
    role: role.value,
  };

  try {
    // 1. Регистрируем пользователя
    const response = await fetch("http://localhost:8000/api/accounts/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok) {
      // 2. Автоматически логинимся через SimpleJWT
      const loginResp = await fetch("http://localhost:8000/api/accounts/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email.value, password: password.value }),
      });
      const loginData = await loginResp.json();

      if (loginResp.ok && loginData.access) {
        localStorage.setItem("access", loginData.access);
        localStorage.setItem("refresh", loginData.refresh);

        // 3. Подгружаем профиль в Pinia-store
        const profileResp = await fetch("http://localhost:8000/api/accounts/profile/", {
          headers: { Authorization: `Bearer ${loginData.access}` },
        });
        if (profileResp.ok) {
          const user = await profileResp.json();
          userStore.setUser(user);
        }

        // Очищаем форму и редиректим на профиль
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        phone.value = "+7 ";
        phoneRaw.value = "+7";
        password.value = "";
        confirm.value = "";
        role.value = "executor";
        successMessage.value = "Регистрация прошла успешно! Перенаправление в личный кабинет...";
        setTimeout(() => router.push('/profile'), 800);
      } else {
        errorMessage.value = "Регистрация успешна, но вход не выполнен. Попробуйте войти вручную.";
      }
    } else {
      if (typeof data === "object" && data !== null) {
        errorMessage.value = Object.values(data).flat().join(" ");
      } else {
        errorMessage.value = "Ошибка регистрации!";
      }
    }
  } catch (err) {
    errorMessage.value = "Нет связи с сервером. Попробуйте позже.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Левая половина: форма -->
    <div class="w-1/2 flex items-center justify-center p-10">
      <div class="w-full max-w-[509px] border-2 border-sky-500 rounded-lg px-8 py-6 space-y-4">
  <!-- Кнопка Назад -->
  <router-link
    to="/"
    class="flex items-center text-gray-600 hover:text-green-600 transition"
  >
    <svg
      class="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Назад
  </router-link>

        <p class="text-xs text-gray-500">Давайте создадим Вам аккаунт</p>
        <h1 class="text-2xl font-bold mb-6">Заполните все поля</h1>

        <!-- Сообщения об ошибке/успехе -->
        <div v-if="errorMessage" class="text-red-600 text-sm mb-2">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-green-600 text-sm mb-2">{{ successMessage }}</div>

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
            <input v-model="phone"
              @input="onPhoneInput"
              type="tel"
              placeholder="+7 999 123‑45‑67"
              maxlength="18"
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
                  class="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-full"
                  :disabled="loading">
            {{ loading ? "Регистрируем..." : "Зарегистрироваться" }}
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
