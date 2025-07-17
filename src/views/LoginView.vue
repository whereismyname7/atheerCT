<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { User } from '@/interfaces/User'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import router from '@/router'
import { authState } from '@/stores/auth'
import { AppRoutes } from '@/constants'

const user = reactive<User>({
  email: '',
  password: '',
})

const loginError = ref('')

async function login() {
  if (user.email !== 'admin@example.com' || user.password !== '123456') {
    loginError.value = 'Email or password are incorrect'
    return
  }

  authState.isLoggedIn = true
  router.push(AppRoutes.HOME)
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

      <Button type="submit" class="w-full"> Login </Button>
    </form>
  </div>
</template>
