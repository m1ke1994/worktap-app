
<script setup lang="ts">
import { ref } from 'vue';

import ProblemWorkTap from '../components/ProblemWorkTap.vue';
import MainContent from '../components/MainContent.vue';
import CurrentWorks from '../components/CurrentWorks.vue';
import TopFreelancers from '../components/TopFreelancers.vue';
import HelpBisness from  '../components/HelpBisness.vue';
import QuickSearch from '../components/QuickSearch.vue';

// 1. Реактивное состояние
const isQuickSearchOpen = ref(false);

// 2. Переключатель
const toggleQuickSearch = () => {
  isQuickSearchOpen.value = !isQuickSearchOpen.value;
};
</script>

<template>
  <main id="content">
    <!-- Геро‑блок -->
    <section  v-if="!isQuickSearchOpen"
      class="bg-[#F7F6FF]"
      data-aos="fade-up"
      data-aos-duration="800"
      aria-label="Основной контент"
    >
      <MainContent :toggleQuickSearch="toggleQuickSearch" />
    </section>

    <!-- Быстрый поиск -->
    <section
      v-if="isQuickSearchOpen"
      class="bg-[#F7F6FF]"
      data-aos="fade-up"
      data-aos-duration="800"
      aria-label="Быстрый поиск"
    >
      <QuickSearch @close="toggleQuickSearch" />
    </section>

    <!-- Остальной контент -->
    <section
      class="currentWorks mt-10 container mx-auto"
      aria-labelledby="works-heading"
    >
      <h2 id="works-heading" class="sr-only">
        Текущие работы и фрилансеры
      </h2>

      <article
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
        aria-label="Текущие заказы"
      >
        <CurrentWorks />
      </article>

      <aside
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
        aria-label="Топ‑фрилансеры"
      >
        <TopFreelancers />
      </aside>

      <article
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
        aria-label="Проблемные задачи"
      >
        <ProblemWorkTap />
      </article>
    </section>

    <section
      data-aos="fade-up"
      data-aos-duration="800"
      aria-label="Помощь бизнесу"
    >
      <HelpBisness />
    </section>
  </main>
</template>
