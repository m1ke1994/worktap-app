<script setup>
import { useUserStore } from '@/store/userStore'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MyWorks from '@/components/MyWorks.vue'
import MyReviews from '@/components/MyReviews.vue'

const BASE_URL = "http://localhost:8000"
const router = useRouter()
const userStore = useUserStore()

// Только актуальные поля из Django-модели!
const user = reactive({
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  phone: "",
  role: "",
  avatar: "",
  specialty: "",
  about: "",
  country: "",
  education: "",
  gender: "",
  status: "",
  skills: [],
  work_experience: "",
  link_portfolio: "",
  rating: 0,
  completed_projects: 0,
})

const avatarPreview = ref("")
const isEdit = ref(false)
const errorMsg = ref("")
const errors = ref({})

const avatarSrc = computed(() => {
  if (avatarPreview.value) return avatarPreview.value
  if (!user.avatar || user.avatar === "None" || user.avatar === null) return '/assets/profile.jpg'
  if (typeof user.avatar === "string" && !user.avatar.startsWith("http")) return BASE_URL + user.avatar
  return user.avatar
})

function onImgError(e) {
  if (!e.target.src.endsWith('/assets/profile.jpg')) {
    e.target.src = '/assets/profile.jpg'
  }
}

onMounted(async () => {
  const token = localStorage.getItem('access')
  if (!token) {
    router.push('/login')
    return
  }
  const resp = await fetch(`${BASE_URL}/api/accounts/profile/`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (resp.ok) {
    const data = await resp.json()
    Object.assign(user, data)
    isEdit.value = !user.specialty // открывать форму, если пусто
    avatarPreview.value = ""
  } else {
    errorMsg.value = "Ошибка загрузки профиля. Авторизуйтесь заново."
    setTimeout(() => router.push('/login'), 1200)
  }
})

function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    user.avatar = file
    avatarPreview.value = URL.createObjectURL(file)
  }
}

// Переводим между строкой и массивом для skills
function arrToStr(val) {
  return (Array.isArray(val) ? val.join(', ') : '')
}
function strToArr(val) {
  if (typeof val === 'string') {
    return val.split(',').map(s => s.trim()).filter(Boolean)
  }
  return []
}

async function saveProfile() {
  errorMsg.value = ''
  errors.value = {}

  // Ввод skills как строки (разделённой запятыми), отправляем как массив
  user.skills = strToArr(user.skills)

  const formData = new FormData()
  for (const [key, val] of Object.entries(user)) {
    if (key === 'avatar') {
      if (val instanceof File) formData.append('avatar', val)
    } else if (Array.isArray(val)) {
      formData.append(key, JSON.stringify(val))
    } else if (val !== undefined && val !== null) {
      formData.append(key, String(val))
    }
  }

  try {
    const res = await fetch(`${BASE_URL}/api/accounts/profile/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: formData
    })

    if (res.ok) {
      const data = await res.json()
      Object.assign(user, data)
      avatarPreview.value = ""
      isEdit.value = false
      await userStore.fetchProfile()
      return
    }

    if (res.status === 400) {
      const data = await res.json()
      errors.value = data
      errorMsg.value = data.non_field_errors?.join(' ') || 'Ошибка валидации'
      return
    }

    throw new Error('Ошибка сохранения профиля')
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<template>
  <div class="py-10 w-[85%] mx-auto">
    <div class="w-full rounded-3xl shadow-xl bg-white/90 flex flex-col md:flex-row overflow-hidden">
      <aside class="w-full md:w-1/3 p-8 flex flex-col items-center bg-[#F3F2FA] border-r">
        <div class="relative group">
          <img :src="avatarSrc" alt="profile" class="w-32 h-32 rounded-full border-4 border-[#8A7DE9] object-cover shadow-lg" @error="onImgError" />
          <label v-if="isEdit" class="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <input type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
            <span class="text-white font-bold">Изменить</span>
          </label>
        </div>
        <div class="mt-4 text-center">
          <h2 class="text-2xl font-extrabold text-gray-900">{{ user.first_name }} {{ user.last_name }}</h2>
          <div v-if="user.role === 'executor'" class="inline-block mt-1 px-4 py-1 rounded-xl bg-green-100 text-green-600 text-xs font-bold">Исполнитель</div>
          <div v-else class="inline-block mt-1 px-4 py-1 rounded-xl bg-orange-100 text-orange-600 text-xs font-bold">Заказчик</div>
        </div>
        <div class="mt-4 w-full space-y-2 text-sm text-gray-600">
          <div><strong>Email:</strong> {{ user.email }}</div>
          <div><strong>Телефон:</strong> {{ user.phone }}</div>
          <div><strong>Страна:</strong> {{ user.country || '—' }}</div>
        </div>
        <div class="mt-4 w-full text-sm text-gray-600">
          <div><strong>Рейтинг:</strong> {{ user.rating }}</div>
          <div><strong>Выполнено проектов:</strong> {{ user.completed_projects }}</div>
        </div>
        <button v-if="!isEdit" @click="isEdit = true" class="mt-8 w-full py-3 rounded-full bg-[#8A7DE9] hover:bg-[#7A68D0] text-white font-bold transition">Редактировать анкету</button>
        <button v-else @click="saveProfile" class="mt-8 w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition">Сохранить</button>
        <div v-if="errorMsg" class="text-center text-red-600 font-bold mt-4">{{ errorMsg }}</div>
      </aside>

      <main class="w-full md:w-2/3 p-8 space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-2">О себе</h3>
          <textarea v-if="isEdit" v-model="user.about" class="w-full border rounded p-3" rows="3"></textarea>
          <p v-else class="text-gray-800 min-h-[44px]">{{ user.about || '—' }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="font-semibold">Имя</label><input v-if="isEdit" v-model="user.first_name" class="w-full border rounded p-2" /><p v-else>{{ user.first_name || '—' }}</p></div>
          <div><label class="font-semibold">Фамилия</label><input v-if="isEdit" v-model="user.last_name" class="w-full border rounded p-2" /><p v-else>{{ user.last_name || '—' }}</p></div>
          <div><label class="font-semibold">Отчество</label><input v-if="isEdit" v-model="user.middle_name" class="w-full border rounded p-2" /><p v-else>{{ user.middle_name || '—' }}</p></div>
          <div><label class="font-semibold">Специальность</label><input v-if="isEdit" v-model="user.specialty" class="w-full border rounded p-2" /><p v-else>{{ user.specialty || '—' }}</p></div>
          <div>
            <label class="font-semibold">Образование</label>
            <select v-if="isEdit" v-model="user.education" class="w-full border rounded p-2">
              <option value="">—</option>
              <option value="none">Нет образования</option>
              <option value="school">Среднее образование</option>
              <option value="college">Средне-специальное</option>
              <option value="bachelor">Бакалавриат</option>
              <option value="master">Магистратура</option>
              <option value="phd">Аспирантура/докторантура</option>
            </select>
            <p v-else>{{ {
              none: 'Нет образования',
              school: 'Среднее образование',
              college: 'Средне-специальное',
              bachelor: 'Бакалавриат',
              master: 'Магистратура',
              phd: 'Аспирантура/докторантура'
            }[user.education] || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Пол</label>
            <select v-if="isEdit" v-model="user.gender" class="w-full border rounded p-2">
              <option value="">—</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
              <option value="other">Другое</option>
            </select>
            <p v-else>{{ { male: 'Мужской', female: 'Женский', other: 'Другое' }[user.gender] || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Статус</label>
            <select v-if="isEdit" v-model="user.status" class="w-full border rounded p-2">
              <option value="">—</option>
              <option value="student">Студент</option>
              <option value="freelancer">Фрилансер</option>
              <option value="employee">Сотрудник компании</option>
              <option value="unemployed">Безработный</option>
              <option value="other">Другое</option>
            </select>
            <p v-else>{{ {
              student: 'Студент',
              freelancer: 'Фрилансер',
              employee: 'Сотрудник компании',
              unemployed: 'Безработный',
              other: 'Другое'
            }[user.status] || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Навыки</label>
            <input
              v-if="isEdit"
              v-model="user.skills"
              class="w-full border rounded p-2"
              placeholder="Через запятую: дизайн, python, маркетинг"
            />
            <p v-else>{{ arrToStr(user.skills) || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Опыт работы</label>
            <textarea
              v-if="isEdit"
              v-model="user.work_experience"
              class="w-full border rounded p-2"
              rows="2"
              placeholder="Компания, должность, годы..."
            ></textarea>
            <p v-else>{{ user.work_experience || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Ссылка на портфолио</label>
            <input
              v-if="isEdit"
              v-model="user.link_portfolio"
              class="w-full border rounded p-2"
              placeholder="https://..."
            />
            <p v-else>
              <a v-if="user.link_portfolio" :href="user.link_portfolio" class="text-blue-600 underline" target="_blank">{{ user.link_portfolio }}</a>
              <span v-else>—</span>
            </p>
          </div>
        </div>
      </main>
    </div>

    <div class="mt-10 space-y-8 w-full">
      <div class="w-full">
        <MyWorks />
      </div>
      <div class="w-full">
        <MyReviews />
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: vertical;
}
</style>
