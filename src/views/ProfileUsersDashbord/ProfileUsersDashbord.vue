<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MyWorks from '@/components/MyWorks.vue'
import MyReviews from '@/components/MyReviews.vue'

const BASE_URL = "http://localhost:8000"
const router = useRouter()

const user = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  avatar: "",
  middle_name: "",
  specialty: "",
  about: "",
  country: "",
  reg_date: "",
  education: "",
  languages: [],
  skills: [],
  certificates: [],
  work_experience: [],
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
    isEdit.value = !user.specialty
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

async function saveProfile() {
  errorMsg.value = ''
  errors.value = {}
  let body, headers
  const isAvatarFile = user.avatar instanceof File

  if (isAvatarFile) {
    body = new FormData()
    for (const [key, val] of Object.entries(user)) {
      if (key === 'avatar' && val) {
        body.append('avatar', val)
      } else if (Array.isArray(val) || typeof val === 'object') {
        body.append(key, JSON.stringify(val))
      } else if (val !== undefined && val !== null) {
        body.append(key, val)
      }
    }
    headers = { Authorization: `Bearer ${localStorage.getItem('access')}` }
  } else {
    const safeUser = { ...user }
    if (!safeUser.avatar || typeof safeUser.avatar !== 'string') delete safeUser.avatar
    body = JSON.stringify(safeUser)
    headers = {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await fetch(`${BASE_URL}/api/accounts/profile/`, {
      method: 'PATCH',
      headers,
      body,
    })
    if (res.ok) {
      const data = await res.json()
      Object.assign(user, data)
      avatarPreview.value = ""
      isEdit.value = false
      return
    }
    if (res.status === 400) {
      const data = await res.json()
      errors.value = data
      errorMsg.value = data.non_field_errors?.join(' ') || ''
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
      <!-- Sidebar -->
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
        </div>
        <button v-if="!isEdit" @click="isEdit = true" class="mt-8 w-full py-3 rounded-full bg-[#8A7DE9] hover:bg-[#7A68D0] text-white font-bold transition">Редактировать анкету</button>
        <button v-else @click="saveProfile" class="mt-8 w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition">Сохранить</button>
        <div v-if="errorMsg" class="text-center text-red-600 font-bold mt-4">{{ errorMsg }}</div>
      </aside>

      <!-- Main Content -->
      <main class="w-full md:w-2/3 p-8 space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-2">О себе</h3>
          <textarea v-if="isEdit" v-model="user.about" class="w-full border rounded p-3"></textarea>
          <p v-else class="text-gray-800 min-h-[44px]">{{ user.about || '—' }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="font-semibold">Имя</label>
            <input v-if="isEdit" v-model="user.first_name" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.first_name || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Фамилия</label>
            <input v-if="isEdit" v-model="user.last_name" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.last_name || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Отчество</label>
            <input v-if="isEdit" v-model="user.middle_name" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.middle_name || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Специальность</label>
            <input v-if="isEdit" v-model="user.specialty" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.specialty || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Страна</label>
            <input v-if="isEdit" v-model="user.country" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.country || '—' }}</p>
          </div>
          <div>
            <label class="font-semibold">Образование</label>
            <input v-if="isEdit" v-model="user.education" type="text" class="w-full border rounded p-2" />
            <p v-else>{{ user.education || '—' }}</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Дополнительные компоненты -->
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