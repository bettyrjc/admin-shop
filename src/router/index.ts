import { adminRoutes } from '@/modules/admin/routes';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/Layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/Views/HomeView.vue'),
        },
      ],
    },
    authRoutes,
    adminRoutes,
  ],
});

export default router;
