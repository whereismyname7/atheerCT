import { ref } from 'vue'
import { ToastType } from '@/enum/ToastType'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

const toasts = ref<Toast[]>([])

function addToast(message: string, type: ToastType = ToastType.INFO) {
  const existing = toasts.value.find((toast) => toast.message === message && toast.type === type)
  if (existing) return

  const id = Date.now()
  toasts.value.push({ id, message, type })

  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

export function useToast() {
  return {
    toasts,
    addToast,
    removeToast,
  }
}
