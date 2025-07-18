<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

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
const errors = ref({}) // <-- Для ошибок по полям

// Новые значения для добавления
const newSkill = ref("")
const newLang = ref("")
const newCertName = ref("")
const newCertUrl = ref("")
const newWorkCompany = ref("")
const newWorkPosition = ref("")
const newWorkPeriod = ref("")
const newWorkDescription = ref("")

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

function addSkill() {
  if (newSkill.value && !user.skills.includes(newSkill.value)) {
    user.skills.push(newSkill.value)
    newSkill.value = ""
  }
}
function removeSkill(skill) {
  user.skills = user.skills.filter(s => s !== skill)
}

function addLanguage() {
  if (newLang.value && !user.languages.includes(newLang.value)) {
    user.languages.push(newLang.value)
    newLang.value = ""
  }
}
function removeLanguage(lang) {
  user.languages = user.languages.filter(l => l !== lang)
}

function addCertificate() {
  if (newCertName.value) {
    user.certificates.push({ name: newCertName.value, url: newCertUrl.value || "#" })
    newCertName.value = ""
    newCertUrl.value = ""
  }
}
function removeCertificate(name) {
  user.certificates = user.certificates.filter(cert => cert.name !== name)
}

function addWorkExperience() {
  if (newWorkCompany.value && newWorkPosition.value && newWorkPeriod.value) {
    user.work_experience.push({
      company: newWorkCompany.value,
      position: newWorkPosition.value,
      period: newWorkPeriod.value,
      description: newWorkDescription.value,
    })
    newWorkCompany.value = ""
    newWorkPosition.value = ""
    newWorkPeriod.value = ""
    newWorkDescription.value = ""
  }
}
function removeWorkExperience(idx) {
  user.work_experience.splice(idx, 1)
}

// === Основная функция для сохранения профиля ===
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
    // Обработка ошибок валидации (400)
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
  <div class="min-h-screen bg-gradient-to-br from-[#E7E7F7] to-[#FAFAFE] py-12">
    <div class="max-w-5xl mx-auto rounded-3xl shadow-xl bg-white/90 flex flex-col md:flex-row overflow-hidden">
      <!-- Sidebar (Profile) -->
      <aside class="md:w-1/3 p-8 flex flex-col items-center bg-[#F3F2FA] border-r">
        <div class="relative group">
          <img
            :src="avatarSrc"
            alt="profile"
            class="w-32 h-32 rounded-full border-4 border-[#8A7DE9] object-cover shadow-lg"
            @error="onImgError"
          />
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
        <div class="mt-4 w-full space-y-2">
          <div class="flex items-center gap-2 text-gray-600 text-sm"><span class="font-bold">Email <span class="text-red-500">*</span>:</span><span class="truncate">{{ user.email }}</span></div>
          <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email.join(' ') }}</div>
          <div class="flex items-center gap-2 text-gray-600 text-sm"><span class="font-bold">Телефон <span class="text-red-500">*</span>:</span><span>{{ user.phone }}</span></div>
          <div v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone.join(' ') }}</div>

        </div>
        <button v-if="!isEdit" @click="isEdit = true" class="mt-8 w-full py-3 rounded-full bg-[#8A7DE9] hover:bg-[#7A68D0] text-white font-bold transition">Редактировать анкету</button>
        <button v-else @click="saveProfile" class="mt-8 w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition">Сохранить</button>
        <div v-if="errorMsg" class="text-center text-red-600 font-bold mt-4">{{ errorMsg }}</div>
        <div v-if="errors.non_field_errors" class="text-center text-red-500 text-xs mt-2">{{ errors.non_field_errors.join(' ') }}</div>
      </aside>

      <!-- Main info -->
      <main class="md:w-2/3 p-10 flex flex-col gap-8">
        <!-- Подсказка -->
        <section class="mb-8">
          <div class="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg text-gray-700 text-sm">
            <div class="mb-1 font-semibold">Пояснения по заполнению профиля:</div>
            <ul class="list-disc pl-6">
              <li><span class="text-red-500 font-bold">*</span> — <span class="font-bold">Обязательное поле</span></li>
              <li><span class="font-bold">Email, телефон, имя, фамилия, роль</span> — обязательны для регистрации и профиля.</li>
              <li><span class="font-bold">Навыки, языки, сертификаты, опыт работы</span> — это массивы (можно добавить несколько, можно оставить пустыми).</li>
              <li><span class="font-bold">Остальные поля</span> — не обязательны, но рекомендуем заполнить для лучшего профиля.</li>
            </ul>
          </div>
        </section>
        <!-- END подсказка -->

        <section>
          <h3 class="text-xl font-semibold mb-2">О себе <span class="text-gray-400 text-xs">(необязательно)</span></h3>
          <textarea
            v-if="isEdit"
            v-model="user.about"
            class="w-full bg-white border border-[#DED8FA] rounded-lg p-3 resize-y focus:ring-2 focus:ring-[#8A7DE9]"
            rows="3"
          ></textarea>
          <div v-else class="text-gray-800 text-md min-h-[48px]">{{ user.about || "—" }}</div>
          <div v-if="errors.about" class="text-red-500 text-xs mt-1">{{ errors.about.join(' ') }}</div>
        </section>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Имя <span class="text-red-500">*</span></h4>
            <input v-if="isEdit" v-model="user.first_name" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="min-h-[28px]">{{ user.first_name || "—" }}</div>
            <div v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name.join(' ') }}</div>
          </section>
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Фамилия <span class="text-red-500">*</span></h4>
            <input v-if="isEdit" v-model="user.last_name" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="min-h-[28px]">{{ user.last_name || "—" }}</div>
            <div v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name.join(' ') }}</div>
          </section>
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Отчество <span class="text-gray-400 text-xs">(необязательно)</span></h4>
            <input v-if="isEdit" v-model="user.middle_name" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="min-h-[28px]">{{ user.middle_name || "—" }}</div>
            <div v-if="errors.middle_name" class="text-red-500 text-xs mt-1">{{ errors.middle_name.join(' ') }}</div>
          </section>
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Специальность <span class="text-gray-400 text-xs">(необязательно)</span></h4>
            <input v-if="isEdit" v-model="user.specialty" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="text-[#7a68d0] font-bold min-h-[28px]">{{ user.specialty || "—" }}</div>
            <div v-if="errors.specialty" class="text-red-500 text-xs mt-1">{{ errors.specialty.join(' ') }}</div>
          </section>
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Страна <span class="text-gray-400 text-xs">(необязательно)</span></h4>
            <input v-if="isEdit" v-model="user.country" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="min-h-[28px]">{{ user.country || "—" }}</div>
            <div v-if="errors.country" class="text-red-500 text-xs mt-1">{{ errors.country.join(' ') }}</div>
          </section>
          <section>
            <h4 class="font-semibold text-gray-700 mb-1">Образование <span class="text-gray-400 text-xs">(необязательно)</span></h4>
            <input v-if="isEdit" v-model="user.education" type="text" class="w-full border-b border-[#a99ee7] bg-transparent py-1 focus:outline-none" />
            <div v-else class="min-h-[28px]">{{ user.education || "—" }}</div>
            <div v-if="errors.education" class="text-red-500 text-xs mt-1">{{ errors.education.join(' ') }}</div>
          </section>
        </div>

        <!-- Skills & Languages -->
        <section>
          <h4 class="font-semibold text-gray-700 mb-1">Навыки <span class="text-gray-400 text-xs">(указать не менее двух значений) </span></h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in user.skills" :key="skill" class="px-3 py-1 bg-[#EBF4FE] rounded-2xl border border-[#8A7DE9] flex items-center gap-2">
              {{ skill }}
              <button v-if="isEdit" @click="removeSkill(skill)" class="text-red-500 font-bold px-1 hover:scale-110 transition">×</button>
            </span>
          </div>
          <div v-if="isEdit" class="flex items-center gap-3 mt-2">
            <input v-model="newSkill" type="text" placeholder="Добавить навык" class="border rounded p-2" />
            <button @click="addSkill" class="bg-green-400 text-white rounded px-3 py-1 hover:bg-green-600 transition">+</button>
          </div>
          <div v-if="errors.skills" class="text-red-500 text-xs mt-1">{{ errors.skills.join(' ') }}</div>
        </section>
        <section>
          <h4 class="font-semibold text-gray-700 mb-1">Языки <span class="text-gray-400 text-xs">(указать не менее двух значений) </span></h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="lang in user.languages" :key="lang" class="px-3 py-1 bg-[#F9F6FE] rounded-2xl border border-[#8A7DE9] flex items-center gap-2">
              {{ lang }}
              <button v-if="isEdit" @click="removeLanguage(lang)" class="text-red-500 font-bold px-1">×</button>
            </span>
          </div>
          <div v-if="isEdit" class="flex items-center gap-3 mt-2">
            <input v-model="newLang" type="text" placeholder="Добавить язык" class="border rounded p-2" />
            <button @click="addLanguage" class="bg-green-400 text-white rounded px-3 py-1 hover:bg-green-600 transition">+</button>
          </div>
          <div v-if="errors.languages" class="text-red-500 text-xs mt-1">{{ errors.languages.join(' ') }}</div>
        </section>

        <!-- Certificates -->
        <section>
          <h4 class="font-semibold text-gray-700 mb-1">Сертификаты <span class="text-gray-400 text-xs">(указать не менее двух значений) </span></h4>
          <ul class="flex flex-col gap-2">
            <li v-for="cert in user.certificates" :key="cert.name" class="flex items-center gap-2">
              <a :href="cert.url" target="_blank" class="text-blue-600 underline">{{ cert.name }}</a>
              <button v-if="isEdit" @click="removeCertificate(cert.name)" class="text-red-500 font-bold px-1">×</button>
            </li>
          </ul>
          <div v-if="isEdit" class="flex items-center gap-2 mt-2">
            <input v-model="newCertName" type="text" placeholder="Название сертификата" class="border rounded p-1" />
            <input v-model="newCertUrl" type="text" placeholder="URL" class="border rounded p-1" />
            <button @click="addCertificate" class="bg-green-400 text-white rounded px-3 py-1 hover:bg-green-600 transition">+</button>
          </div>
          <div v-if="errors.certificates" class="text-red-500 text-xs mt-1">{{ errors.certificates.join(' ') }}</div>
        </section>

        <!-- Work experience -->
        <section>
          <h4 class="font-semibold text-gray-700 mb-1">Опыт работы <span class="text-gray-400 text-xs">(указать не менее двух значений) </span></h4>
          <ul class="flex flex-col gap-3">
            <li v-for="(exp, i) in user.work_experience" :key="i" class="flex items-start gap-2">
              <div>
                <div class="font-semibold text-[#7a68d0]">{{ exp.company }} — {{ exp.position }}</div>
                <div class="text-xs text-gray-400">{{ exp.period }}</div>
                <div class="text-sm">{{ exp.description }}</div>
              </div>
              <button v-if="isEdit" @click="removeWorkExperience(i)" class="text-red-500 font-bold px-1 ml-2">×</button>
            </li>
          </ul>
          <div v-if="isEdit" class="flex flex-col gap-2 mt-2">
            <input v-model="newWorkCompany" type="text" placeholder="Компания" class="border rounded p-1" />
            <input v-model="newWorkPosition" type="text" placeholder="Должность" class="border rounded p-1" />
            <input v-model="newWorkPeriod" type="text" placeholder="Период (например: 2021-2024)" class="border rounded p-1" />
            <input v-model="newWorkDescription" type="text" placeholder="Описание" class="border rounded p-1" />
            <button @click="addWorkExperience" class="bg-green-400 text-white rounded px-3 py-1 hover:bg-green-600 transition self-start">Добавить опыт</button>
          </div>
          <div v-if="errors.work_experience" class="text-red-500 text-xs mt-1">{{ errors.work_experience.join(' ') }}</div>
        </section>
      </main>
    </div>
  </div>
</template>

