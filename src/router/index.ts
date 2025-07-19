import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import { AppRoutes } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.HOME,
      name: 'home',
      component: HomeView,
    },
    {
      path: AppRoutes.SIGNUP,
      name: 'signup',
      component: SignUpView,
    },
    {
      path: AppRoutes.LOGIN,
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
