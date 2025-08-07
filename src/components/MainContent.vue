<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function handleQuickSearch() {
  router.push('/search')
}
</script>

<template>
  <section class="relative overflow-hidden min-h-[640px] flex items-center py-14 md:py-24">
    <!-- Фон на весь экран, object-position — чтобы “голова” ноутбука не срезалась -->
    <img
      src="/public/assets/banner_2.jpg"
      alt=""
      class="fixed md:absolute top-0 left-0 w-full h-full object-cover object-top md:object-center opacity-30 pointer-events-none select-none z-0"
      style="min-height: 640px; max-height: 900px;"
    />
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center z-10 relative">
      <!-- Левая часть -->
      <div class="w-full md:w-1/2 space-y-8 animate-fadein-up relative z-20">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          <span class="inline-block">Приложение для</span>
          <span class="text-[#1DBF73] block mt-1">поиска фрилансеров и заказчиков</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-md">
          Найдите специалиста для своей задачи за пару минут — безопасно, удобно, прозрачно. Без скрытых комиссий!
        </p>
        <div class="mt-8">
          <button @click="handleQuickSearch"
            class="relative px-10 py-4 rounded-2xl font-semibold text-lg bg-[#1DBF73] text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 focus:ring-2 focus:ring-[#1DBF73]">
            <span class="inline-flex items-center gap-2">
              Быстрый поиск
              <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
            </span>
          </button>
        </div>
      </div>
    <!-- Правая часть: ноутбук, аватары, письма, линии -->
<div class="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 relative min-h-[350px] z-20">
  <div class="relative" style="width: 420px; height: 320px; overflow:visible;">
    <!-- Фоновые прямые линии -->
    <svg class="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" width="420" height="320">
      <line x1="70" y1="40" x2="350" y2="40" stroke="#1DBF73" stroke-opacity="0.06" stroke-width="3" />
      <line x1="70" y1="160" x2="350" y2="160" stroke="#1DBF73" stroke-opacity="0.07" stroke-width="3" />
      <line x1="70" y1="280" x2="350" y2="280" stroke="#1DBF73" stroke-opacity="0.06" stroke-width="3" />
    </svg>

    <!-- Заказчики (слева) -->
    <img src="/public/assets/avatar1.jpg"
         class="absolute" style="top:10px; left:10px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Заказчик 1" />
    <img src="/public/assets/avatar2.jpg"
         class="absolute" style="top:133px; left:10px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Заказчик 2" />
    <img src="/public/assets/avatar3.jpg"
         class="absolute" style="top:256px; left:10px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Заказчик 3" />

    <!-- Фрилансеры (справа) -->
    <img src="/public/assets/avatar4.jpg"
         class="absolute" style="top:10px; left:356px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Фрилансер 1" />
    <img src="/public/assets/avatar5.jpg"
         class="absolute" style="top:133px; left:356px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Фрилансер 2" />
    <img src="/public/assets/avatar6.jpg"
         class="absolute" style="top:256px; left:356px; width:54px; height:54px; border-radius:50%; box-shadow:0 0 0 3px #fff;" alt="Фрилансер 3" />

    <!-- Письма (6 шт, разные траектории, разное направление) -->
    <!-- 1 -> 4 (диагональ вверх) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-1 z-30" alt="Письмо" />
    <!-- 2 -> 5 (прямая средняя) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-2 z-30" alt="Письмо" />
    <!-- 3 -> 6 (диагональ вниз) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-3 z-30" alt="Письмо" />
    <!-- 1 -> 6 (через центр, кривая) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-4 z-30" alt="Письмо" />
    <!-- 4 -> 2 (дуга справа налево) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-5 z-30" alt="Письмо" />
    <!-- 5 -> 3 (дуга сверху вниз) -->
    <img src="/public/assets/email.svg" class="absolute mail-chaos-6 z-30" alt="Письмо" />
  </div>
</div>

    </div>
  </section>
</template>

<style scoped>
.mail-chaos-1 {
  width:36px;height:36px;left:70px;top:40px; /* старт 1 */
  animation: mail-chaos-anim-1 3.2s cubic-bezier(.8,.1,.2,1.1) infinite;
}
@keyframes mail-chaos-anim-1 {
  0%   { left:70px; top:40px; opacity:1; }
  50%  { left:210px; top:90px; opacity:1; }
  100% { left:350px; top:40px; opacity:1; }
}

.mail-chaos-2 {
  width:36px;height:36px;left:70px;top:160px; /* старт 2 */
  animation: mail-chaos-anim-2 3.4s cubic-bezier(.7,.1,.3,1.1) infinite .7s;
}
@keyframes mail-chaos-anim-2 {
  0%   { left:70px; top:160px; opacity:1; }
  60%  { left:210px; top:160px; opacity:1; }
  100% { left:350px; top:160px; opacity:1; }
}

.mail-chaos-3 {
  width:36px;height:36px;left:70px;top:280px; /* старт 3 */
  animation: mail-chaos-anim-3 3.6s cubic-bezier(.75,.2,.4,1.1) infinite 1.4s;
}
@keyframes mail-chaos-anim-3 {
  0%   { left:70px; top:280px; opacity:1; }
  40%  { left:210px; top:220px; opacity:1; }
  100% { left:350px; top:280px; opacity:1; }
}

/* Диагональная траектория через центр */
.mail-chaos-4 {
  width:36px;height:36px;left:70px;top:40px;
  animation: mail-chaos-anim-4 4.2s cubic-bezier(.6,.3,.4,1.1) infinite 2.1s;
}
@keyframes mail-chaos-anim-4 {
  0%   { left:70px; top:40px; opacity:1; }
  40%  { left:210px; top:160px; opacity:1; }
  70%  { left:270px; top:230px; opacity:1; }
  100% { left:350px; top:280px; opacity:1; }
}

/* Справа налево дугой (фрилансер1->заказчик2) */
.mail-chaos-5 {
  width:36px;height:36px;left:350px;top:40px;
  animation: mail-chaos-anim-5 3.7s cubic-bezier(.6,.2,.3,1) infinite 1.1s;
}
@keyframes mail-chaos-anim-5 {
  0%   { left:350px; top:40px; opacity:1;}
  45%  { left:210px; top:110px; opacity:1;}
  90%  { left:70px;  top:160px; opacity:1;}
  100% { left:70px;  top:160px; opacity:1;}
}

/* Фрилансер2 вниз к заказчику3 */
.mail-chaos-6 {
  width:36px;height:36px;left:350px;top:160px;
  animation: mail-chaos-anim-6 3.9s cubic-bezier(.6,.2,.3,1) infinite 2.3s;
}
@keyframes mail-chaos-anim-6 {
  0%   { left:350px; top:160px; opacity:1;}
  30%  { left:310px; top:220px; opacity:1;}
  90%  { left:70px;  top:280px; opacity:1;}
  100% { left:70px;  top:280px; opacity:1;}
}

/* ====== Fade-in ====== */
@keyframes fadein-up {
  0% { opacity: 0; transform: translateY(48px);}
  100% { opacity: 1; transform: translateY(0);}
}
.animate-fadein-up {
  animation: fadein-up 1s cubic-bezier(.22,1,.36,1) both;
}

/* ======= АНИМАЦИЯ ПИСЕМ ======= */
/* Письмо 1: заказчик 1 -> фрилансер 1 (верхняя линия) */
.mail-anim-1 {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 70px; top: 40px;
  animation: mail-anim-path-1 2.6s cubic-bezier(0.83,0,0.17,1) infinite;
}
@keyframes mail-anim-path-1 {
  0% { left: 70px; top: 40px; opacity: 1;}
  50% { left: 210px; top: 40px; opacity: 1; transform: scale(1.12); filter: drop-shadow(0 0 10px #1DBF73cc);}
  100% { left: 350px; top: 40px; opacity: 1;}
}

/* Письмо 2: заказчик 2 -> фрилансер 2 (средняя линия) */
.mail-anim-2 {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 70px; top: 160px;
  animation: mail-anim-path-2 2.9s cubic-bezier(0.83,0,0.17,1) infinite;
}
@keyframes mail-anim-path-2 {
  0% { left: 70px; top: 160px; opacity: 1;}
  55% { left: 210px; top: 160px; opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 8px #1DBF73b0);}
  100% { left: 350px; top: 160px; opacity: 1;}
}

/* Письмо 3: заказчик 3 -> фрилансер 3 (нижняя линия) */
.mail-anim-3 {
  width: 36px;
  height: 36px;
  position: absolute;
  left: 70px; top: 280px;
  animation: mail-anim-path-3 3.3s cubic-bezier(0.83,0,0.17,1) infinite;
}
@keyframes mail-anim-path-3 {
  0% { left: 70px; top: 280px; opacity: 1;}
  60% { left: 210px; top: 280px; opacity: 1; transform: scale(1.1);}
  100% { left: 350px; top: 280px; opacity: 1;}
}
</style>
