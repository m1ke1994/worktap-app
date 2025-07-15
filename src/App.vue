
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'; // <-- Импортируем useRoute
import HeaderApp from './components/HeaderApp.vue';
import Footer from './components/Footer.vue';

import { onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    once: true, // анимация только один раз
    easing: 'ease-in-out-quad',
  })
});
const route = useRoute();

// Скрываем шапку и подвал на странице логина
const showLayout = computed(() => {
 
  return !['/login', '/password-reset','/recover-password','/register'].includes(route.path);
});

</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderApp v-if="showLayout"></HeaderApp>
   <!--  <section class="bg-[#F7F6FF]" data-aos="fade-up" data-aos-duration="800" >
      <MainContent />
    </section>
    <section class="currentWorks mt-10 conteiner">
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
         <CurrentWorks />
      </div>
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        <TopFreelancers></TopFreelancers>
      </div>
      <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        <ProblemWorkTap></ProblemWorkTap>
      </div>
    </section>
    <section data-aos="fade-up" data-aos-duration="800">
      <HelpBisness> </HelpBisness>
    </section> -->
    <div>
      <router-view></router-view>
    </div>
    
    
      <Footer v-if="showLayout"></Footer>
    
  </div>
</template>

<style scoped>
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}
</style> 

