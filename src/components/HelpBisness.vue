<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const advantages = [
  { title: 'Без комиссий за заказы',      description: 'WorkTap не берет процент с ваших сделок – вы получаете всю прибыль, а мы помогаем находить клиентов.', icon: '💰' },
  { title: 'Больше доверия и заказов',    description: 'Прозрачные отзывы и рейтинги специалистов повышают доверие клиентов, а значит – растут ваши продажи.', icon: '⭐'  },
  { title: 'Удобное управление услугами', description: 'Размещайте услуги, общайтесь с клиентами и получайте оплату в одном сервисе без лишних затрат.',     icon: '🛠️' },
  { title: 'Экономия на маркетинге',      description: 'WorkTap продвигает ваш профиль среди целевой аудитории, экономя ваши рекламные бюджеты.',            icon: '📈' },
  { title: 'Работайте без ограничений',   description: 'Никаких скрытых платежей – вы платите только за подписку, а все заработанное остается у вас.',        icon: '🔓' }
]

let io
onMounted(() => {
  document.documentElement.classList.add('has-js')

  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.advantage-card').forEach((el) => io.observe(el))
  } else {
    document.querySelectorAll('.advantage-card').forEach((el) => el.classList.add('in-view'))
  }
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section class="relative grid min-h-screen place-items-stretch overflow-hidden px-6 py-[clamp(24px,5vw,56px)] text-slate-900 dark:text-slate-200">
    <!-- background -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -inset-[20%] z-0"
      :style="{
        background:
          'radial-gradient(60rem_60rem_at_10%_-10%, rgba(139,92,246,.18), transparent_55%),'+
          'radial-gradient(60rem_60rem_at_100%_10%, rgba(16,185,129,.18), transparent_55%),'+
          'linear-gradient(180deg, rgba(241,247,255,1)_0%, rgba(255,255,255,1)_60%)',
        filter: 'saturate(1.05)'
      }"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-[1] opacity-30 mix-blend-soft-light dark:opacity-20"
      
    
    />

    <div class="container relative z-[2] mx-auto w-full max-w-[1180px]">
      <div class="mb-[clamp(20px,3.5vw,40px)]">
        <h2 class="text-[clamp(26px,4vw,44px)] font-extrabold leading-tight tracking-[-.02em]">
          Как
          <span class="bg-gradient-to-r from-emerald-500 to-violet-500 bg-clip-text text-transparent">WorkHome</span>
          помогает бизнесу?
        </h2>
        <p class="mt-2 text-[clamp(14px,2vw,16px)] text-slate-700 dark:text-slate-300">
          Больше видимости, меньше затрат — расти быстрее вместе с нами.
        </p>
      </div>

      <div class="grid grid-cols-[1.1fr_.9fr] gap-[clamp(20px,4vw,48px)] max-[960px]:grid-cols-1">
        <!-- advantages -->
        <div class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] content-start gap-[clamp(12px,2.4vw,18px)]" role="list">
          <article
            v-for="(a, i) in advantages"
            :key="i"
            class="advantage-card relative grid grid-cols-[auto_1fr] gap-3 rounded-2xl border bg-white/90 p-4 shadow-[0_10px_25px_rgba(16,24,40,.06),0_2px_6px_rgba(16,24,40,.04)] backdrop-blur-xl transition-all duration-500 has-js:opacity-0 has-js:translate-y-5 has-js:scale-[.98] hover:-translate-y-1 hover:scale-[1.01] dark:border-white/10 dark:bg-slate-900/70"
            :style="{ '--delay': `${i * 90}ms` }"
            role="listitem"
          >
            <div class="grid h-11 w-11 place-content-center rounded-xl border border-black/5 bg-gradient-to-tr from-emerald-500/25 to-violet-500/25 text-[22px] shadow-inner [background-image:radial-gradient(80%_100%_at_50%_0,rgba(255,255,255,.9),rgba(255,255,255,.6))]"></div>
            <div>
              <h3 class="mb-1 mt-0.5 text-[16px] font-extrabold tracking-[-.01em]">{{ a.title }}</h3>
              <p class="text-[14px] leading-[1.6] text-slate-700 dark:text-slate-300">{{ a.description }}</p>
            </div>
          </article>
        </div>

        <!-- side mock -->
        <aside class="relative grid min-h-[320px] place-items-center">
          <div class="pointer-events-none absolute z-[0] rounded-full blur-lg opacity-60 [animation:float_8s_ease-in-out_infinite] w-[70%] h-[70%] [background:radial-gradient(closest-side,rgba(16,185,129,.25),transparent_65%)]" aria-hidden="true"></div>
          <div class="pointer-events-none absolute z-[0] rounded-full blur-lg opacity-60 [animation:float_8s_ease-in-out_infinite] [animation-delay:1.1s] w-[55%] h-[55%] [background:radial-gradient(closest-side,rgba(139,92,246,.25),transparent_65%)]" aria-hidden="true"></div>

          <div class="relative z-[2] w-full max-w-[440px] transform rounded-2xl border border-black/10 bg-white/90 p-[18px] shadow-[0_25px_60px_rgba(2,6,23,.15),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition-transform duration-700 [transform:perspective(900px)_rotateX(2deg)_rotateY(-4deg)] hover:[transform:perspective(900px)_rotateX(0)_rotateY(0)] dark:border-white/10 dark:bg-slate-900/85">
            <div class="mb-3 flex items-center justify-between">
              <div class="grid h-9 w-9 place-content-center rounded-[10px] bg-gradient-to-tr from-emerald-500 to-violet-500 font-extrabold tracking-wide text-white shadow-[0_6px_16px_rgba(139,92,246,.35)]">WT</div>
              <div class="rounded-full border border-slate-900/10 bg-gradient-to-b from-white to-slate-50 px-2.5 py-1 text-[12px] font-extrabold text-slate-900 dark:border-white/20 dark:from-white/10 dark:to-white/10 dark:text-slate-200">TOP Rated</div>
            </div>

            <div class="mb-2.5 grid grid-cols-3 gap-2.5">
              <div>
                <div class="text-[12px] text-slate-600 dark:text-slate-400">Заказы</div>
                <div class="text-[18px] font-black tracking-[.2px] text-slate-900 dark:text-slate-200">+142%</div>
              </div>
              <div>
                <div class="text-[12px] text-slate-600 dark:text-slate-400">Просмотры</div>
                <div class="text-[18px] font-black tracking-[.2px] text-slate-900 dark:text-slate-200">+78%</div>
              </div>
              <div>
                <div class="text-[12px] text-slate-600 dark:text-slate-400">Конверсия</div>
                <div class="text-[18px] font-black tracking-[.2px] text-slate-900 dark:text-slate-200">5.4%</div>
              </div>
            </div>

            <div class="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10" aria-label="Прогресс">
              <span class="block h-full rounded-full bg-gradient-to-r from-emerald-500/90 to-violet-500/90 shadow-[0_6px_18px_rgba(16,185,129,.25)]" style="width:78%"></span>
            </div>

            <div class="flex justify-end gap-2.5">
              <button type="button" class="rounded-xl px-4 py-2 text-[14px] font-extrabold tracking-[.2px] text-white shadow-[0_10px_20px_rgba(16,185,129,.25)] transition will-change-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gradient-to-tr from-emerald-500 to-violet-500">Создать услугу</button>
              <button type="button" class="rounded-xl border border-slate-900/10 bg-white px-4 py-2 text-[14px] font-extrabold tracking-[.2px] text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-white/20 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15">Тарифы</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* минимальные утилиты, которых нет «из коробки» в Tailwind без кастомной конфигурации */
.has-js .advantage-card{opacity:0;transform:translateY(18px) scale(.98)}
.advantage-card.in-view{opacity:1;transform:translateY(0) scale(1);transition-delay:var(--delay,0ms)}
@keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
</style>
