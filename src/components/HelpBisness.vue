<script setup>
const advantages = [
  {
    title: "Без комиссий за заказы",
    description: "WorkTap не берет процент с ваших сделок – вы получаете всю прибыль, а мы помогаем находить клиентов.",
    icon: "💰"
  },
  {
    title: "Больше доверия и заказов",
    description: "Прозрачные отзывы и рейтинги специалистов повышают доверие клиентов, а значит – растут ваши продажи.",
    icon: "⭐"
  },
  {
    title: "Удобное управление услугами",
    description: "Размещайте услуги, общайтесь с клиентами и получайте оплату в одном сервисе без лишних затрат.",
    icon: "🛠️"
  },
  {
    title: "Экономия на маркетинге",
    description: "WorkTap продвигает ваш профиль среди целевой аудитории, экономя ваши рекламные бюджеты.",
    icon: "📈"
  },
  {
    title: "Работайте без ограничений",
    description: "Никаких скрытых платежей – вы платите только за подписку, а все заработанное остается у вас.",
    icon: "🔓"
  }
]
</script>

<template>
  <div class="hero-section">
    <div class="container">
        <h2 class="font-bold text-3xl text-left mb-10 text-white">Как WorkTap помогает бизнесу?</h2>
      <div class="content">
        <div class="advantages">
          <div 
            class="advantage-card" 
            v-for="(advantage, index) in advantages" 
            :key="index"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <span class="icon">{{ advantage.icon }}</span>
            <div>
              <h3>{{ advantage.title }}</h3>
              <p>{{ advantage.description }}</p>
            </div>
          </div>
        </div>
        <div class="image-side">
          <!-- Здесь можно разместить дополнительное изображение -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 100vh;
  background-image: url('/assets/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2rem;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.advantages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: var(--delay);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 1.8rem;
  margin-top: 0.2rem;
}

h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

p {
  color: #555;
  line-height: 1.5;
}

.image-side {
  flex: 1;
  display: none; /* Скрыто по умолчанию для мобильных */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптация для планшетов и десктопов */
@media (min-width: 768px) {
  .content {
    flex-direction: row;
  }
  
  .image-side {
   
  }
  
  .hero-section {
    padding: 4rem;
  }
}
</style>