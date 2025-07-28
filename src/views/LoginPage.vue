<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

// Слайдер-карусель текста
const slides = [
  "Worktap — ваш надёжный путь к быстрым и качественным фриланс-услугам.",
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

// Назад
function goBack() {
  router.back();
}

async function onLogin() {
  errorMessage.value = "";
  loading.value = true;
  try {
    const resp = await fetch("http://localhost:8000/api/accounts/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email.value, password: password.value }),
    });
    const data = await resp.json();

    if (resp.ok && data.access) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      await userStore.fetchProfile();

      router.push("/profile");
    } else {
      errorMessage.value = data.detail || "Неверный логин или пароль!";
    }
  } catch {
    errorMessage.value = "Ошибка соединения с сервером!";
  } finally {
    loading.value = false;
  }
}

function onGoogleLogin() {
  alert("Google авторизация пока не реализована!");
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Левая часть -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-6">
        <!-- Кнопка Назад -->
        <router-link
          to="/"
          class="flex items-center text-gray-600 hover:text-green-600 transition mb-2"
        >
          <svg
            class="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад
        </router-link>

        <!-- Заголовок -->
        <div>
          <h1 class="text-3xl font-bold">Добро пожаловать!</h1>
          <h2 class="mt-2 text-lg text-gray-700">Войдите в свой аккаунт</h2>
        </div>

        <!-- Форма входа -->
        <form @submit.prevent="onLogin" class="space-y-4">
          <div v-if="errorMessage" class="text-red-600 text-sm mb-2">
            {{ errorMessage }}
          </div>

          <label class="block text-gray-600 font-medium">
            E-mail
            <input
              v-model="email"
              type="email"
              placeholder="E-mail"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
              autocomplete="username"
            />
          </label>

          <label class="block text-gray-600 font-medium">
            Пароль
            <input
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
              autocomplete="current-password"
            />
          </label>

          <div class="flex items-center justify-between">
            <router-link
              to="/password-reset"
              class="text-sm text-orange-500 hover:underline"
            >
              Забыли пароль?
            </router-link>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition"
          >
            <span v-if="loading">Входим...</span>
            <span v-else>Войти</span>
          </button>
        </form>

        <!-- Google-кнопка -->
        <button
          @click="onGoogleLogin"
          type="button"
          class="w-full py-3 rounded-full bg-gray-800 text-white flex items-center justify-center mt-2"
        >
          <img
            src="/assets/google-icon.svg"
            alt="Google"
            class="w-5 h-5 mr-2"
          />
          Или войдите с помощью Google
        </button>

        <!-- Регистрация -->
        <p class="text-center text-gray-600">
          У вас всё ещё нет аккаунта?
          <router-link
            to="/register"
            class="text-orange-500 hover:underline transition-all duration-300"
          >
            Зарегистрируйтесь бесплатно!
          </router-link>
        </p>
      </div>
    </div>

    <!-- Правая часть с фоном -->
    <div
      class="w-1/2 hidden md:block relative bg-cover bg-center"
      :style="{ backgroundImage: `url('/assets/bg-login1.png')` }"
    >
      <div
        class="absolute bottom-10 left-10 right-10 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg"
      >
        <p
          class="text-gray-800 text-base transition-all duration-300 min-h-[44px]"
        >
          {{ slides[currentIndex] }}
        </p>
        <div class="flex justify-center mt-3">
          <span
            v-for="(slide, index) in slides"
            :key="index"
            class="w-2 h-2 bg-yellow-400 rounded-full mx-1"
            :class="{
              'opacity-100': index === currentIndex,
              'opacity-50': index !== currentIndex,
            }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
