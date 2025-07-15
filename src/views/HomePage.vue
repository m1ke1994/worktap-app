<script setup>
import ProblemWorkTap from '../components/ProblemWorkTap.vue';
import MainContent from '../components/MainContent.vue';
import CurrentWorks from '../components/CurrentWorks.vue';
import TopFreelancers from '../components/TopFreelancers.vue';
import HelpBisness from  '../components/HelpBisness.vue';
</script>
<template>
<main id="content" >
  <section
    className="bg-[#F7F6FF]"
    data-aos="fade-up"
    data-aos-duration="800"
    aria-label="Основной контент"
  >
    <MainContent />
  </section>

  
  <section
    className="currentWorks mt-10 container mx-auto"
    aria-labelledby="works-heading"
  >
    <h2 id="works-heading" className="sr-only">
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


