<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const categories = [
  "ДИЗАЙН",
  "РАЗРАБОТКА И IT",
  "ТЕКСТЫ И ПЕРЕВОДЫ",
  "КУРЬЕРСКИЕ УСЛУГИ",
  "КОМПЬЮТЕРНАЯ ПОМОЩЬ"
];

const keyboardLayout = [
  { char: 'Й' }, { char: 'Ц' }, { char: 'У' }, { char: 'К' }, { char: 'Е' }, { char: 'Н' }, { char: 'Г' }, { char: 'Ш' }, { char: 'Щ' }, { char: 'З' },
  { char: 'Ф' }, { char: 'Ы' }, { char: 'В' }, { char: 'А' }, { char: 'П' }, { char: 'Р' }, { char: 'О' }, { char: 'Л' }, { char: 'Д' },
  { char: 'Я' }, { char: 'Ч' }, { char: 'С' }, { char: 'М' }, { char: 'И' }, { char: 'Т' }, { char: 'Ь' }
];

const displayedText = ref('');
const currentCategory = ref('');
const activeKey = ref(null);
const usedKeys = ref([]);
const isTyping = ref(false);
let typingInterval = null;

const typeCategory = (category) => {
  isTyping.value = true;
  currentCategory.value = category;
  displayedText.value = '';
  usedKeys.value = [];
  
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < category.length) {
      const char = category[i];
      displayedText.value += char;
      
      activeKey.value = char === '/' ? 'I' : char;
      usedKeys.value.push(char.toUpperCase());
      
      setTimeout(() => {
        activeKey.value = null;
      }, 200);
      
      i++;
    } else {
      clearInterval(typingInterval);
      isTyping.value = false;
      
      setTimeout(() => {
        const nextIndex = (categories.indexOf(category) + 1) % categories.length;
        typeCategory(categories[nextIndex]);
      }, 2000);
    }
  }, 150);
};

onMounted(() => {
  typeCategory(categories[0]);
});

onBeforeUnmount(() => {
  clearInterval(typingInterval);
});
</script>

<template>
  <div class="computer bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[600px]">
    <div class="monitor bg-gray-50 border-8 border-gray-200 rounded-xl p-4">
      <div class="screen bg-white border border-gray-200 rounded p-6 min-h-[200px] w-full">
        <div class="display-container flex items-center">
          <div class="display-text text-2xl font-mono text-gray-800 whitespace-nowrap overflow-hidden">
            {{ displayedText }}<span class="cursor" :class="{ 'opacity-0': !isTyping }">|</span>
          </div>
        </div>
      </div>
    </div>
    <div class="keyboard-container mt-6 p-6 bg-gray-100 rounded-xl">
      <div 
        v-for="(key, index) in keyboardLayout" 
        :key="index"
        class="key bg-white text-gray-800 shadow-sm"
        :class="{ 
          'transform translate-y-1 shadow-none bg-[#1DBF73] text-white': activeKey === key.char,
          'bg-amber-200': usedKeys.includes(key.char.toUpperCase())
        }"
      >
        {{ key.char }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.computer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.monitor {
  width: 100%;
}

.screen {
  position: relative;
}

.display-container {
  width: 100%;
  overflow: hidden;
}

.display-text {
  display: inline-block;
  vertical-align: middle;
}

.keyboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

.key {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.15s ease;
  cursor: default;
  user-select: none;
  font-size: 16px;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 24px;
  background-color: #1DBF73;
  animation: blink 0.7s infinite;
  vertical-align: middle;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (max-width: 640px) {
  .key {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .display-text {
    font-size: 20px;
  }
  
  .cursor {
    height: 20px;
  }
}
</style>