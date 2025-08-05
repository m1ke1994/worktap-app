<!-- components/CardWork.vue -->
<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  workId: { type: [String, Number], required: true },
  open:   { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);
const work = ref(null);
const loading = ref(false);
const error = ref("");

watch(() => props.workId, fetchWork, { immediate: true });

async function fetchWork() {
  if (!props.workId) return;
  loading.value = true;
  error.value = "";
  try {
    const token = localStorage.getItem("access");
    const res = await fetch(`http://localhost:8000/api/works/${props.workId}/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Не удалось получить кворк");
    work.value = await res.json();
  } catch (e) {
    error.value = e.message || "Ошибка загрузки";
    work.value = null;
  } finally {
    loading.value = false;
  }
}

function formatPrice(price) {
  return price ? price.toLocaleString("ru-RU") + " ₽" : "";
}
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "long", year: "numeric"
  });
}
const ownerInitials = computed(() =>
  work.value
    ? ((work.value.owner_first_name?.[0] || "") + (work.value.owner_last_name?.[0] || "")).toUpperCase()
    : ""
);
function stringToColor(str) {
  if (!str) return "#DDD";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360},70%,85%)`;
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="relative w-full max-w-xl md:max-w-2xl mx-auto rounded-2xl shadow-2xl bg-white flex flex-col md:flex-row p-0"
        style="max-height: 90vh;"
      >
        <!-- Левая часть (визуал) -->
        <div class="md:w-1/3 flex flex-col items-center justify-center bg-gradient-to-tr from-[#f7faff] to-[#e9e6fb] p-6 md:rounded-l-2xl min-w-[170px]">
          <div
            class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mb-3 shadow"
            :style="{ background: stringToColor(work?.owner_id?.toString()) }"
            v-if="work"
          >
            {{ ownerInitials }}
          </div>
          <div class="text-center mb-1 font-medium text-[#6555BE] text-lg" v-if="work">
            {{ work.owner_first_name }} {{ work.owner_last_name }}
          </div>
          <div class="text-center text-gray-400 text-xs mb-8" v-if="work">
            ID: {{ work.owner_id }}
          </div>
          <div class="text-[#1DBF73] font-bold text-xl md:text-2xl mb-1" v-if="work">
            {{ formatPrice(work.price) }}
          </div>
          <div class="text-gray-400 text-xs mb-4" v-if="work">
            Срок: <span class="text-gray-700 font-semibold">{{ work.deadline }}</span> дн.
          </div>
        </div>
        <!-- Правая часть -->
        <div class="flex-1 flex flex-col p-6 relative overflow-hidden">
          <button
            class="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-400 z-10"
            @click="emit('close')"
            title="Закрыть"
          >×</button>
          <div v-if="loading" class="py-16 text-center text-gray-500">Загрузка...</div>
          <div v-else-if="error" class="py-16 text-center text-red-500">{{ error }}</div>
          <div
            v-else-if="work"
            class="overflow-y-auto"
            style="max-height: 78vh;"
          >
            <div class="flex flex-wrap gap-x-3 items-center mb-2">
              <span class="text-xs md:text-sm px-3 py-1 bg-[#f6f2fc] rounded-full text-[#6555BE] font-semibold">{{ work.category }}</span>
              <span v-if="work.subcategory" class="text-xs md:text-sm px-3 py-1 bg-[#e8fbf5] rounded-full text-[#1DBF73] font-semibold">{{ work.subcategory }}</span>
              <span class="ml-auto text-xs text-gray-400">Создан: {{ formatDate(work.created_at) }}</span>
            </div>
            <h2 class="font-bold text-xl md:text-2xl mb-3 text-[#473d69] break-words">{{ work.title }}</h2>
            <div class="mb-5">
              <div class="font-semibold text-gray-700 mb-1">Описание:</div>
              <div class="text-gray-800 whitespace-pre-line text-base break-words">
                {{ work.description }}
              </div>
            </div>
            <div v-if="work.requirements" class="mb-5">
              <div class="font-semibold text-gray-700 mb-1">Требования к заказчику:</div>
              <div class="text-gray-700 whitespace-pre-line text-base break-words">
                {{ work.requirements }}
              </div>
            </div>
            <div class="flex gap-4 mt-6">
              <button
                @click="emit('close')"
                class="px-7 py-2 bg-[#f7faff] text-[#6555BE] rounded-full font-semibold border border-[#ded4f5] hover:bg-[#ede8fc] transition"
              >Назад</button>
            </div>
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
