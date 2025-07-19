<script setup lang="ts">
import { useToast } from '@/stores/Toast'

const { toasts } = useToast()

const colorMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
}

const iconMap = {
  success: 'bi-check-circle-fill',
  error: 'bi-x-circle-fill',
  info: 'bi-info-circle-fill',
}
</script>

<template>
  <div class="fixed top-5 mt-8 right-4 space-y-3 z-50">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-center gap-3 max-w-sm p-4 rounded-xl shadow-lg text-white animate-fade-in-up',
          colorMap[toast.type],
        ]"
      >
        <i :class="['bi text-2xl', iconMap[toast.type]]"></i>
        <span class="text-sm font-medium leading-snug">
          {{ toast.message }}
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out both;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
