<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { User } from '@/interfaces/User'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import router from '@/router'
import { authState } from '@/stores/auth'
import { ApiRoutes, AppRoutes } from '@/constants'
import { ButtonType } from '@/enum/ButtonType'
import { ButtonStyle } from '@/enum/ButtonStyle'
import { HttpMethod } from '@/enum/HttpMethod'
import apiFetch from '@/utils/apiFetch'
import { ToastType } from '@/enum/ToastType'
import { useToast } from '@/stores/Toast'

const { addToast } = useToast()

const user = reactive<User>({
  email: '',
  password: '',
})

const loginError = ref('')

async function login() {
  try {
    const data = await apiFetch<null>({
      url: ApiRoutes.LOGIN,
      method: HttpMethod.POST,
      body: {
        email: user.email,
        password: user.password,
      },
    })

    if (!data.success) {
      addToast(data.message, ToastType.ERROR)
      return
    }

    authState.isLoggedIn = true
    addToast(data.message, ToastType.SUCCESS)
    router.push(AppRoutes.HOME)
  } catch (error: any) {
    addToast(error.message || 'An unexpected error occurred', ToastType.ERROR)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white">
    <h2 class="text-2xl font-semibold mb-6 text-center text-primary">Login</h2>

    <form @submit.prevent="login" class="flex flex-col gap-4">
      <Input v-model="user.email" placeholder="Email" />

      <Input v-model="user.password" type="password" placeholder="Password" />

      <div v-if="loginError" class="text-red-500 text-sm text-center -mt-2">
        <i class="bi bi-info-circle"></i> {{ loginError }}
      </div>

      <Button :type="ButtonType.SUBMIT" :variant="ButtonStyle.SOLID" class="w-full"> Login </Button>
    </form>
  </div>
</template>
