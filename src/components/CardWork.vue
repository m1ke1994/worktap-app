<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Пропсы
const props = defineProps({
  work: Object,
});
const emit = defineEmits(["close", "completed"]);
const isLoading = ref(false);

// Форматирование цены и даты
function formatPrice(price) {
  return price ? price.toLocaleString("ru-RU") + " ₽" : "";
}
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "long", year: "numeric"
  });
}

// Статус — цвет и подпись
function statusBadge(status) {
  switch (status) {
    case "completed":
      return { color: "bg-red-100 text-red-600", label: "Завершён" };
    case "in_progress":
      return { color: "bg-blue-100 text-blue-600", label: "В работе" };
    default:
      return { color: "bg-green-100 text-green-600", label: "В ожидании" };
  }
}


async function completeWork() {
  if (!props.work?.id) return;
  const token = localStorage.getItem("access");
  isLoading.value = true;
  const res = await fetch(`http://localhost:8000/api/works/my/${props.work.id}/complete/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  isLoading.value = false;
  if (res.ok) {
    emit("completed", props.work.id);
    emit("close");
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.work"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur"
      @click.self="() => emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl md:flex overflow-hidden relative">
        <!-- Левая панель с владельцем и статусом -->
        <div class="md:w-1/3 flex flex-col items-center justify-center bg-gradient-to-tr from-[#f7faff] to-[#e9e6fb] p-8 md:rounded-l-2xl border-r border-[#ede8fc] min-w-[200px]">
          <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold mb-3 shadow">
            <!-- Можно заменить на <img> если есть аватар -->
            {{ props.work.owner_first_name?.[0] ?? "" }}{{ props.work.owner_last_name?.[0] ?? "" }}
          </div>
          <div class="text-center mb-1 font-bold text-[#6555BE] text-lg">
            {{ props.work.owner_first_name }} {{ props.work.owner_last_name }}
          </div>
          <div class="text-center text-gray-400 text-xs mb-6">ID: {{ props.work.owner_id }}</div>
          <span
            class="text-xs font-bold py-1 px-3 rounded-full mb-2"
            :class="statusBadge(props.work.status).color"
          >
            {{ statusBadge(props.work.status).label }}
          </span>
          <div class="text-[#1DBF73] font-bold text-2xl mb-1">{{ formatPrice(props.work.price) }}</div>
          <div class="text-gray-400 text-xs mb-1">
            Срок: <span class="text-gray-700 font-semibold">{{ props.work.deadline }}</span> дн.
          </div>
          <div class="text-gray-400 text-xs mb-6">
            Создан: {{ formatDate(props.work.created_at) }}
          </div>
        </div>

        <!-- Правая панель с описанием -->
        <div class="flex-1 flex flex-col px-6 py-8 overflow-y-auto" style="max-height: 90vh;">
          <button
            class="absolute top-4 right-6 text-2xl text-gray-400 hover:text-red-400 z-20"
            @click="() => emit('close')"
            title="Закрыть"
          >×</button>
          <div class="flex gap-2 text-xs mb-2 flex-wrap">
            <span class="bg-[#f6f2fc] text-[#6555BE] rounded px-2 py-1">{{ props.work.category }}</span>
            <span v-if="props.work.subcategory" class="bg-[#e8fbf5] text-[#1DBF73] rounded px-2 py-1">{{ props.work.subcategory }}</span>
          </div>
          <h2 class="font-bold text-2xl mb-3 break-words">{{ props.work.title }}</h2>
          <div class="mb-4">
            <div class="font-semibold mb-1">Описание:</div>
            <div class="text-gray-800 whitespace-pre-line break-words max-h-40 overflow-y-auto pr-1">
              {{ props.work.description }}
            </div>
          </div>
          <div v-if="props.work.requirements" class="mb-4">
            <div class="font-semibold mb-1">Требования к заказчику:</div>
            <div class="text-gray-700 whitespace-pre-line break-words max-h-32 overflow-y-auto pr-1">
              {{ props.work.requirements }}
            </div>
          </div>
          <div class="flex gap-4 mt-8 flex-wrap">
            <button
              @click="() => emit('close')"
              class="px-7 py-2 bg-[#f7faff] text-[#6555BE] rounded-full font-semibold border border-[#ded4f5] hover:bg-[#ede8fc] transition-colors duration-200"
            >Закрыть</button>
            <button
              v-if="props.work.status !== 'completed'"
              @click="completeWork"
              :disabled="isLoading"
              class="px-7 py-2 bg-[#1DBF73] text-white rounded-full font-semibold hover:bg-[#159f5e] transition-colors duration-200"
            >
              {{ isLoading ? "Завершаем..." : "Завершить" }}
            </button>
            <button
              class="px-7 py-2 bg-white border text-[#1DBF73] border-[#1DBF73] rounded-full font-semibold hover:bg-[#f4fff9] transition"
            >Написать</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
