import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SellView from '@/views/SellView.vue'
import PreparingView from '@/views/PreparingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sell',
      name: "sell",
      component: PreparingView  // temporary
    }
  ]
})

export default router
