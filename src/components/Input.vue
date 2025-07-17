<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col">
    <input
      :type="type || 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="inputValue"
      :class="[
        'border rounded-md px-3 py-2 focus:outline-none transition',
        error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-primary',
        disabled ? 'bg-gray-100 cursor-not-allowed' : '',
        customClass,
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
