<script setup lang="ts">
import { AppRoutes } from '@/constants'
</script>

<template>
  <header
    class="bg-gradient-to-r from-primary to-primary-light bg-opacity-80 backdrop-blur-md shadow-md mb-4 p-2"
  >
    <router-link :to="AppRoutes.HOME">
      <img alt="atheer logo" src="@/assets/atheerLogo.svg" class="cursor-pointer" />
    </router-link>
  </header>
</template>
