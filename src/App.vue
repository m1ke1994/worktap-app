<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router"; // <-- Импортируем useRoute
import HeaderApp from "./components/HeaderApp.vue";
import Footer from "./components/Footer.vue";
import HowItWorksModal from "./components/ModalWindow/HowItWorksModal.vue";
import RulesModal from "./components/ModalWindow/RulesModal.vue";
import { onMounted } from "vue";
import AOS from "aos";
const route = useRoute();

const isModalRules=ref(false);
const openModalRules  = () => { isModalRules.value = true  }   // открыть
const closeModalRules = () => { isModalRules.value = false }   // закрыть







const isModalOpen = ref(false)    
const openModal  = () => { isModalOpen.value = true  }   // открыть
const closeModal = () => { isModalOpen.value = false }   // закрыть
onMounted(() => {
  AOS.init({
    once: true, // анимация только один раз
    easing: "ease-in-out-quad",
  });
});


// Скрываем шапку и подвал на странице логина
const showLayout = computed(() => {
  return ![
    "/login",
    "/password-reset",
    "/recover-password",
    "/register",
  ].includes(route.path);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderApp v-if="showLayout"></HeaderApp>

    <div>
      <router-view></router-view>
    </div>
     <Transition                                  
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <HowItWorksModal v-if="isModalOpen" @close="closeModal" />
    </Transition>
    <Transition                                  
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <RulesModal v-if="isModalRules" @close="closeModalRules" />
    </Transition>

    <Footer
      :openModal="openModal"
      v-if="showLayout"
    ></Footer>
  </div>
</template>

<style scoped>
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
