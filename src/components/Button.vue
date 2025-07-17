<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit'
  disabled?: boolean
  customClass?: string
  variant?: 'solid' | 'outline'
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :class="[
      'px-4 rounded-md h-[40px] flex items-center justify-center transition duration-200',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      variant === 'outline'
        ? 'bg-transparent border border-2 border-primary text-black hover:bg-primary hover:text-white'
        : 'bg-primary text-white hover:bg-primary-dark',
      customClass,
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
