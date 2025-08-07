<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Top bar: search + sort -->
    <div class="max-w-4xl mx-auto py-16">
      <div class="flex flex-col gap-4 mb-8">
        <div class="flex flex-wrap gap-3 w-full">
          <!-- Search by category -->
          <input
            v-model="search"
            type="text"
            placeholder="Введите категорию..."
            class="flex-1 min-w-0 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none bg-white text-sm"
          />
          <button
            @click="() => {}"
            class="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition"
          >
            Найти
          </button>
          <!-- Sort -->
         <select
  v-model="sortOrder"
  class="px-3 py-2 rounded-full border border-gray-300 bg-white text-[18px] font-semibold text-gray-700"
>
  <option value="asc">Цена &#8593;&#8593;</option>
<option value="desc">Цена &#8595;&#8595;</option>

</select>

        </div>
        <!-- Active category chips -->
        <div class="flex gap-2 items-center flex-wrap" v-if="categories.length">
          <span class="text-gray-500 text-sm">Категории:</span>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="toggleCategory(cat)"
            :class="[
              'px-3 py-1 rounded-full text-sm transition',
              selectedCategory === cat
                ? 'bg-green-500 text-white shadow'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100',
            ]"
          >
            {{ cat }}
          </button>
          <button
            v-if="selectedCategory"
            @click="selectedCategory = ''"
            class="px-3 py-1 rounded-full bg-gray-200 text-xs text-gray-600 hover:bg-gray-300 transition"
          >
            Сбросить
          </button>
        </div>
      </div>

      <!-- List header -->
      <div class="flex justify-between items-center mb-3 text-sm text-gray-500">
        <div>{{ sortedWorks.length }} ворков найдено</div>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="text-center my-8">Загрузка...</div>

      <!-- Works list -->
      <div
        v-for="work in sortedWorks"
        :key="work.id"
        class="relative bg-white p-5 rounded-2xl shadow transition hover:shadow-lg mb-5  "
      >
        <div class="flex justify-between items-start gap-4">
          <!-- Avatar & info -->
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <template v-if="hasAvatar(work.owner_avatar)">
              <img
                :src="work.owner_avatar"
                alt="Avatar"
                class="w-12 h-12 rounded-full object-cover"
              />
            </template>
            <template v-else>
              <div
                class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold uppercase select-none"
              >
                {{ getInitials(work.owner_first_name, work.owner_last_name) }}
              </div>
            </template>

            <!-- Text info -->
            <div>
              <h3
                class="font-semibold text-base leading-snug mb-1 text-gray-800"
              >
                {{ work.title }}
              </h3>
              <p class="text-xs text-gray-500">
                Категория: {{ work.category }}
              </p>
              <p class="text-xs text-gray-400">
                Опубликовано: {{ formatDate(work.created_at) }}
              </p>
              <p
                class="text-xs mt-1"
                :class="
                  work.status === 'pending'
                    ? 'text-yellow-500'
                    : 'text-green-600'
                "
              >
                Статус:
                {{ work.status === "pending" ? "В ожидании" : work.status }}
              </p>
            </div>
          </div>

          <!-- Price & action -->
          <div class="flex flex-col items-end gap-2 text-sm">
            <div class="text-green-600 font-semibold">
              {{ work.price.toLocaleString() }} ₽
            </div>
            <button
              @click="openModal(work)"
              class="px-4 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold shadow transition"
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal && selectedWork"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        class="relative w-full max-w-lg mx-4 bg-white rounded-3xl shadow-2xl p-8 animate-fade-in"
      >
        <!-- Close btn -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 bg-white rounded-full p-2 shadow text-gray-400 hover:text-green-600 hover:shadow-lg transition"
          aria-label="Закрыть"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-6">
          <template v-if="hasAvatar(selectedWork.owner_avatar)">
            <img
              :src="selectedWork.owner_avatar"
              alt="Avatar"
              class="w-14 h-14 rounded-full object-cover border-4 border-green-100 shadow"
            />
          </template>
          <template v-else>
            <div
              class="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-2xl uppercase select-none shadow"
            >
              {{
                getInitials(
                  selectedWork.owner_first_name,
                  selectedWork.owner_last_name
                )
              }}
            </div>
          </template>
          <div>
            <h2 class="font-bold text-xl mb-1">{{ selectedWork.title }}</h2>
            <p class="text-xs text-gray-500">
              Категория: {{ selectedWork.category }}
            </p>
            <p class="text-xs text-gray-400 mt-1">
              Автор: {{ selectedWork.owner_first_name }}
              {{ selectedWork.owner_last_name }}
            </p>
          </div>
        </div>

        <!-- Body -->
        <section class="mb-4">
          <h3 class="font-semibold text-gray-700 mb-1">Описание</h3>
          <p class="whitespace-pre-line text-sm text-gray-800">
            {{ selectedWork.description }}
          </p>
        </section>

        <section class="mb-4">
          <h3 class="font-semibold text-gray-700 mb-1">Требования</h3>
          <p class="whitespace-pre-line text-sm text-gray-800">
            {{ selectedWork.requirements }}
          </p>
        </section>

        <!-- Details -->
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-800 mb-6">
          <div>
            <span class="font-semibold">Срок:</span>
            {{ selectedWork.deadline }} дн.
            <span
              v-if="getDaysLeft(selectedWork)"
              :class="
                getDaysLeft(selectedWork).includes('Просрочено')
                  ? 'text-red-500 font-bold ml-2'
                  : 'text-green-600 font-bold ml-2'
              "
            >
              {{ getDaysLeft(selectedWork) }}
            </span>
          </div>
          <div>
            <span class="font-semibold">Бюджет:</span>
            {{ selectedWork.price.toLocaleString() }} ₽
          </div>
          <div>
            <span class="font-semibold">Статус:</span>
            {{
              selectedWork.status === "pending"
                ? "В ожидании"
                : selectedWork.status
            }}
          </div>
          <div>
            <span class="font-semibold">Дата:</span>
            {{ formatDate(selectedWork.created_at) }}
          </div>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 justify-end">
          <button
            @click="closeModal"
            class="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-100 shadow-sm transition"
          >
            Назад
          </button>
          <button
            class="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold shadow hover:from-green-500 hover:to-green-600 transition"
            @click="() => alert('Переход в чат / написать пользователю')"
          >
            Написать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// State
const works = ref([]);
const loading = ref(false);
const sortOrder = ref("asc");
const search = ref("");
const selectedCategory = ref("");

// Modal state
const selectedWork = ref(null);
const showModal = ref(false);

// Fetch data
const fetchWorks = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get("http://localhost:8000/api/works/", {
      params: { status: "pending" },
    });
    works.value = data;
  } catch (e) {
    console.error(e);
    works.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWorks);

// Derived data
const categories = computed(() => {
  return [...new Set(works.value.map((w) => w.category).filter(Boolean))];
});

const filteredWorks = computed(() => {
  let list = Array.isArray(works.value) ? [...works.value] : [];
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase();
    list = list.filter((w) => w.category?.toLowerCase().includes(q));
  }
  if (selectedCategory.value) {
    list = list.filter((w) => w.category === selectedCategory.value);
  }
  return list;
});

const sortedWorks = computed(() => {
  return [...filteredWorks.value].sort((a, b) =>
    sortOrder.value === "asc" ? a.price - b.price : b.price - a.price
  );
});

// Helpers
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}

function getDaysLeft(work) {
  if (!work?.created_at || !work?.deadline) return "";
  const created = new Date(work.created_at);
  const deadlineDate = new Date(created);
  deadlineDate.setDate(deadlineDate.getDate() + Number(work.deadline));
  const now = new Date();
  const diff = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `Осталось: ${diff} дн.`;
  if (diff === 0) return "Сегодня последний день";
  return `Просрочено на ${Math.abs(diff)} дн.`;
}

function getInitials(firstName, lastName) {
  return ((firstName?.[0] || "") + (lastName?.[0] || "")).toUpperCase() || "U";
}

function hasAvatar(avatar) {
  return !!(avatar && typeof avatar === "string" && avatar.trim() !== "");
}

function openModal(work) {
  selectedWork.value = work;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedWork.value = null;
}

function toggleCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? "" : cat;
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in {
  animation: fadeInUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
