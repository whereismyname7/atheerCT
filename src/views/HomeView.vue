<script setup lang="ts">
import Button from '@/components/Button.vue'
import { authState } from '@/stores/auth'
import { computed } from 'vue'
import { AppRoutes } from '@/constants'
import { ButtonType } from '@/enum/ButtonType'
import { ButtonStyle } from '@/enum/ButtonStyle'
const isLoggedIn = computed(() => authState.isLoggedIn)
</script>

<template>
  <div class="flex justify-center items-center flex-col text-center">
    <div class="text-primary text-6xl mb-5">Next-Gen Wireless Infrastructure</div>
    <div v-if="isLoggedIn" class="text-xl">Welcome Aboard!</div>

    <div v-if="!isLoggedIn" class="flex gap-4 mb-2">
      <router-link :to="AppRoutes.SIGNUP">
        <Button customClass="w-32" :type="ButtonType.BUTTON" :variant="ButtonStyle.OUTLINE"
          >Sign Up</Button
        >
      </router-link>
      <router-link :to="AppRoutes.LOGIN">
        <Button customClass="w-32" :type="ButtonType.BUTTON" :variant="ButtonStyle.OUTLINE"
          >Login</Button
        >
      </router-link>
    </div>
  </div>

  <div>
    <img alt="banner" src="@/assets/banner.svg" class="w-full" />
  </div>
</template>
