<script setup>
import { ref } from "vue";
const props = defineProps({
  work: Object,
  avatar: Object,
});
function formatPrice(price) {
  return price ? price.toLocaleString("ru-RU") + " ₽" : "";
}
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
const showModal = ref(false);
function openModal(e) {
  e?.stopPropagation?.();
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
function formatStatus(status) {
  switch (status) {
    case "pending":
      return { text: "В ожидании", color: "#22c55e" }; 
    case "in_progress":
      return { text: "В работе", color: "#3b82f6" }; 
    case "completed":
      return { text: "Завершён", color: "#ef4444" };
    default:
      return { text: "Неизвестно", color: "#6c757d" };
  }
}
</script>

<template>
  <div
    class="work-card bg-white rounded-2xl shadow-md flex flex-col p-6 transition-shadow duration-200 cursor-pointer min-h-[250px] select-none"
  >
    <div class="flex gap-4 items-center mb-4">
      <div
        class="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shadow"
        :style="{ background: avatar.color }"
      >
        {{ avatar.initials }}
      </div>
      <div>
        <div class="text-[#6555BE] font-medium">
          {{ work.owner_first_name }} {{ work.owner_last_name }}
        </div>
        <div class="text-xs text-gray-400">ID: {{ work.owner_id }}</div>
        <div
          class="text-xs font-semibold"
          :style="{ color: formatStatus(work.status).color }"
        >
        <span class="text-gray-400">Статус:</span> {{ formatStatus(work.status).text }}
        </div>
      </div>
    </div>
    <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ work.title }}</h3>
    <div class="flex gap-2 text-xs mb-2">
      <span class="bg-[#f6f2fc] text-[#6555BE] rounded px-2 py-1">{{
        work.category
      }}</span>
      <span
        v-if="work.subcategory"
        class="bg-[#e8fbf5] text-[#1DBF73] rounded px-2 py-1"
        >{{ work.subcategory }}</span
      >
    </div>
    <div class="text-gray-500 mb-3 text-sm line-clamp-3">
      {{ work.description }}
    </div>
    <div class="mt-auto flex items-end justify-between">
      <span class="font-bold text-[#1DBF73] text-base">{{
        formatPrice(work.price)
      }}</span>
      <button
        @click.stop="openModal"
        class="ml-2 px-4 py-1 rounded-full text-xs font-semibold bg-[#f7faff] text-[#6555BE] hover:bg-[#ede8fc] border border-[#ded4f5] transition-colors duration-200"
      >
        Посмотреть
      </button>
    </div>
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur"
        @click.self="closeModal"
        tabindex="0"
        style="pointer-events: auto"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-0 relative flex flex-col md:flex-row overflow-hidden"
          style="max-height: 90vh"
          @click.stop
        >
          <div
            class="md:w-1/3 flex flex-col items-center justify-center bg-gradient-to-tr from-[#f7faff] to-[#e9e6fb] py-10 px-6 md:rounded-l-2xl border-r border-[#ede8fc] min-w-[230px]"
          >
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow"
              :style="{ background: avatar.color }"
            >
              {{ avatar.initials }}
            </div>
            <div class="text-center mb-1 font-bold text-[#6555BE] text-lg">
              {{ work.owner_first_name }} {{ work.owner_last_name }}
            </div>
            <div class="text-center text-gray-400 text-xs mb-6">
              ID: {{ work.owner_id }}
            </div>
            <div class="text-[#1DBF73] font-bold text-2xl mb-1">
              {{ formatPrice(work.price) }}
            </div>
            <div
              class="text-xs font-semibold mb-1"
              :style="{ color: formatStatus(work.status).color }"
            >
              <span class="text-gray-400">Статус:</span> {{ formatStatus(work.status).text }}
            </div>

            <div class="text-gray-400 text-xs mb-1">
              Срок:
              <span class="text-gray-700 font-semibold">{{
                work.deadline
              }}</span>
              дн.
            </div>
            <div class="text-gray-400 text-xs mb-6">
              Создан: {{ formatDate(work.created_at) }}
            </div>
          </div>
          <div
            class="flex-1 flex flex-col px-8 py-8 overflow-y-auto"
            style="max-height: 90vh"
          >
            <button
              class="absolute top-5 right-6 text-2xl text-gray-400 hover:text-red-400 z-20"
              @click="closeModal"
              title="Закрыть"
            >
              ×
            </button>
            <div class="flex gap-2 text-xs mb-2 flex-wrap">
              <span class="bg-[#f6f2fc] text-[#6555BE] rounded px-2 py-1">{{
                work.category
              }}</span>
              <span
                v-if="work.subcategory"
                class="bg-[#e8fbf5] text-[#1DBF73] rounded px-2 py-1"
                >{{ work.subcategory }}</span
              >
            </div>
            <h2 class="font-bold text-2xl mb-3 break-words">
              {{ work.title }}
            </h2>
            <div class="mb-4">
              <div class="font-semibold mb-1">Описание:</div>
              <div
                class="text-gray-800 whitespace-pre-line break-words max-h-40 overflow-y-auto pr-1"
              >
                {{ work.description }}
              </div>
            </div>
            <div v-if="work.requirements" class="mb-4">
              <div class="font-semibold mb-1">Требования к заказчику:</div>
              <div
                class="text-gray-700 whitespace-pre-line break-words max-h-32 overflow-y-auto pr-1"
              >
                {{ work.requirements }}
              </div>
            </div>
            <div class="flex gap-4 mt-10 flex-wrap">
              <button
                @click="closeModal"
                class="px-7 py-2 bg-[#f7faff] text-[#6555BE] rounded-full font-semibold border border-[#ded4f5] hover:bg-[#ede8fc] transition-colors duration-200"
              >
                Закрыть
              </button>
              <button
                class="px-7 py-2 bg-[#1DBF73] text-white rounded-full font-semibold hover:bg-[#159f5e] transition-colors duration-200"
              >
                Написать
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Только плавная смена тени, НИКАКИХ transform, translate, scale на карточке! */
.work-card {
  box-shadow: 0 2px 16px 0 rgba(87, 74, 183, 0.06),
    0 1.5px 5px 0 rgba(87, 74, 183, 0.04);
  will-change: box-shadow;
}
.work-card:hover {
  box-shadow: 0 4px 24px 0 rgba(87, 74, 183, 0.1),
    0 3px 12px 0 rgba(87, 74, 183, 0.07);
}

/* Не трогать padding, border, margin, position, etc при hover! Только тень! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
