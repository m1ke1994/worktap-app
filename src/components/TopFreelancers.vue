<script setup>
import TopFreelancersCard from './TopFreelancersCard.vue';
const freelancers = [
  {
    id: 1,
    name: "Марина Королёва",
    profession: "Разработчик PHP",
    completedProjects: 65,
    rating: 4.8,
    status: false,
    image: "freelancer1.svg",
  },
  {
    id: 2,
    name: "Иван Петров",
    profession: "Frontend разработчик",
    completedProjects: 42,
    rating: 4.9,
    status: true,
    image: "freelancer2.svg",
  },
  {
    id: 3,
    name: "Анна Смирнова",
    profession: "Дизайнер UX/UI",
    completedProjects: 37,
    rating: 4.7,
    status: false,
    image: "freelancer3.svg",
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    profession: "Backend разработчик",
    completedProjects: 58,
    rating: 4.6,
    status: true,
    image: "freelancer4.svg",
  },
  {
    id: 5,
    name: "Екатерина Козлова",
    profession: "Мобильный разработчик",
    completedProjects: 31,
    rating: 4.5,
    status: true,
    image: "freelancer5.svg",
  }
];
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="font-bold text-3xl text-left mb-10">Топ фрилансеров</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TopFreelancersCard 
        v-for="freelancer in freelancers" 
        :key="freelancer.id" 
        :name="freelancer.name"
        :profession="freelancer.profession"
        :projects="freelancer.completedProjects"
        :rating="freelancer.rating"
        :status="freelancer.status"
        :image="freelancer.image"
      />
        <div class="card border rounded-xl shadow-lg flex flex-col p-6 bg-[#F7F6FF] hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 cursor-pointer min-h-[250px]">
  <div class="flex flex-col items-center justify-center h-full gap-2">
    <p class="text-xl font-bold text-[#1DBF73] text-center">Посмотреть всех ТОП фрилансеров</p>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#1DBF73] mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
</div>
    </div>
    
  </div>
</template>

<style scoped>
/* Стили при необходимости */
</style>