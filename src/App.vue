
<script setup>
import HeaderApp from './components/HeaderApp.vue';
import ProblemWorkTap from './components/ProblemWorkTap.vue';
import MainContent from './components/MainContent.vue';
import CurrentWorks from './components/CurrentWorks.vue';
import TopFreelancers from './components/TopFreelancers.vue';
import HelpBisness from  './components/HelpBisness.vue';
import Footer from './components/Footer.vue';

import { onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    once: true, // анимация только один раз
    easing: 'ease-in-out-quad',
  })
})

</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderApp></HeaderApp>
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
    
    <footer class="bg-[#F7F6FF]">
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped>
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}
</style> 

