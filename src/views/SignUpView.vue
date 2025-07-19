<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/constants'
import type { User } from '@/interfaces/User'
import { ButtonStyle } from '@/enum/ButtonStyle'
import { ButtonType } from '@/enum/ButtonType'
import { ToastType } from '@/enum/ToastType'
import { useToast } from '@/stores/Toast'
import apiFetch from '@/utils/apiFetch'
import { HttpMethod } from '@/enum/HttpMethod'
import { ApiRoutes } from '@/constants'

const router = useRouter()
const { addToast } = useToast()

const user = reactive<User>({
  email: '',
  password: '',
})

const emailError = ref('')

const minLength = computed(() => user.password.length >= 8)
const hasUpper = computed(() => /[A-Z]/.test(user.password))
const hasLower = computed(() => /[a-z]/.test(user.password))
const hasNumber = computed(() => /\d/.test(user.password))
const hasSpecial = computed(() => /[!@#$%^&*]/.test(user.password))

const isPasswordValid = computed(
  () => minLength.value && hasUpper.value && hasLower.value && hasNumber.value && hasSpecial.value,
)

const isEmailValid = computed(() => /\S+@\S+\.\S+/.test(user.email))
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

watch(
  () => user.email,
  () => {
    if (!user.email) emailError.value = 'Email is required'
    else if (!isEmailValid.value) emailError.value = 'Invalid email format'
    else emailError.value = ''
  },
)

async function submit() {
  if (!isFormValid.value) return

  try {
    const data = await apiFetch<null>({
      url: ApiRoutes.REGISTER,
      method: HttpMethod.POST,
      body: { email: user.email, password: user.password },
    })

    if (!data.success) {
      addToast(data.message, ToastType.ERROR)
      return
    }

    addToast(data.message, ToastType.SUCCESS)
    router.push(AppRoutes.LOGIN)
  } catch (error: any) {
    addToast(error.message || 'An unexpected error occurred', ToastType.ERROR)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center text-primary">Sign Up</h1>

    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <Input v-model="user.email" type="email" placeholder="Email" :error="emailError" />

      <div>
        <Input v-model="user.password" type="password" placeholder="Password" />

        <div class="mt-2 p-3 border rounded-md text-sm bg-gray-50">
          <ul class="space-y-1">
            <li :class="minLength ? 'text-green-600' : 'text-red-600'">
              <span v-if="minLength">✅</span><span v-else>❌</span>
              At least 8 characters
            </li>
            <li :class="hasUpper ? 'text-green-600' : 'text-red-600'">
              <span v-if="hasUpper">✅</span><span v-else>❌</span>
              At least 1 uppercase letter
            </li>
            <li :class="hasLower ? 'text-green-600' : 'text-red-600'">
              <span v-if="hasLower">✅</span><span v-else>❌</span>
              At least 1 lowercase letter
            </li>
            <li :class="hasNumber ? 'text-green-600' : 'text-red-600'">
              <span v-if="hasNumber">✅</span><span v-else>❌</span>
              At least 1 number
            </li>
            <li :class="hasSpecial ? 'text-green-600' : 'text-red-600'">
              <span v-if="hasSpecial">✅</span><span v-else>❌</span>
              At least 1 special character (!@#$%^&*)
            </li>
          </ul>
        </div>
      </div>

      <Button
        :type="ButtonType.SUBMIT"
        :variant="ButtonStyle.SOLID"
        :disabled="!isFormValid"
        class="w-full"
      >
        Sign Up
      </Button>
    </form>
  </div>
</template>
