<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import CardWork from "@/components/CardWork.vue"; // МОДАЛКА!!!

const userStore = useUserStore();
const router = useRouter();

const myWorks = ref([]);
const showModal = ref(false);
const selectedWork = ref(null);

function onCompleted(id) {
  // Обновить статус в основном списке
  myWorks.value = myWorks.value.map(w =>
    w.id === id ? { ...w, status: "completed" } : w
  );
}

function onPlusClick() {
  if (userStore.user) {
    router.push("/create-work");
  } else {
    router.push("/login");
  }
}

function openDetails(work) {
  selectedWork.value = work;      // Сохраняем сам ворк!
  showModal.value = true;
}

function closeDetails() {
  showModal.value = false;
  selectedWork.value = null;
}

function formatPrice(price) {
  return price ? price.toLocaleString("ru-RU") + " ₽" : "";
}

onMounted(async () => {
  const token = localStorage.getItem("access");
  if (!token) return;
  const res = await fetch("http://localhost:8000/api/works/my/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    myWorks.value = await res.json();
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">

    <!-- CardWork как модалка -->
    <CardWork
      v-if="showModal && selectedWork"
      :work="selectedWork"
      @close="closeDetails"
      @completed="onCompleted"
    />

    <h2 class="font-bold text-3xl text-left mb-6">Мои задания</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      <!-- Плюсовая карточка -->
      <div
        @click="onPlusClick"
        class="bg-gradient-to-tr from-[#d7ffec] to-[#b7f8e4] rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[210px] cursor-pointer hover:shadow-2xl transition-all duration-300 group"
      >
        <img
          src="/assets/plus_works.svg"
          alt="Добавить ворк"
          class="w-16 h-16 mb-2 transition-transform duration-300 group-hover:scale-110"
        />
        <span class="text-[#1DBF73] font-semibold mt-2 text-lg">Создать новый ворк</span>
      </div>

      <!-- Ворки пользователя -->
      <div
        v-for="work in myWorks"
        :key="work.id"
        class="bg-white rounded-2xl shadow-lg flex flex-col p-6 hover:shadow-2xl transition-all duration-300 min-h-[210px] group"
      >
        <h3 class="text-xl font-semibold mb-1 line-clamp-2">{{ work.title }}</h3>
        <div class="mb-1 flex gap-2 text-sm text-gray-500">
          <span class="font-semibold">{{ work.category }}</span>
          <span v-if="work.subcategory">/ {{ work.subcategory }}</span>
        </div>
        <div class="mb-2 text-sm text-gray-400">
          Статус:
         <span
  :class="{
    'text-blue-500': work.status === 'in_progress',
    'text-red-500': work.status === 'completed',      // БЫЛО green, СТАЛО red!
    'text-green-500': work.status === 'pending'
  }"
  class="font-semibold capitalize"
>
  {{
    work.status === 'in_progress'
      ? 'В работе'
      : work.status === 'completed'
      ? 'Завершён'
      : 'В ожидании'
  }}
</span>
        </div>
        <div class="text-sm text-gray-400 mb-4">
          Срок: <span class="text-gray-600 font-medium">{{ work.deadline }}</span> дней
        </div>
        <div class="mt-auto flex items-end justify-between">
          <span class="font-bold text-[#1DBF73] text-lg">{{ formatPrice(work.price) }}</span>
          <button
            @click="openDetails(work)"
            class="px-3 py-1 rounded-full text-xs font-semibold bg-[#f7faff] text-[#6555BE] hover:bg-[#ede8fc] transition"
          >
            Подробнее
          </button>
        </div>
      </div>

      <!-- Если нет ворков -->
      <div
        v-if="myWorks.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-16 opacity-60"
      >
        <img src="/assets/no-photo--lg.png" class="w-24 mb-6" alt="Пусто" />
        <div class="text-gray-400 text-xl mb-2">У вас пока нет опубликованных ворков</div>
        <button
          @click="onPlusClick"
          class="mt-2 px-8 py-2 bg-[#1DBF73] text-white rounded-full font-semibold hover:bg-[#159f5e] transition"
        >
          Создать ворк
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
