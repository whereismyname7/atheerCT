<script setup lang="ts">
import { ButtonStyle } from '@/enum/ButtonStyle'
import { ButtonType } from '@/enum/ButtonType'

defineProps<{
  type?: ButtonType
  disabled?: boolean
  customClass?: string
  variant?: ButtonStyle
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
      variant === ButtonStyle.OUTLINE
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
