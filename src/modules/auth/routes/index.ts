import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '../guards/is-not-authenticated.guard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  redirect: { name: 'login' },
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/views/RegisterView.vue'),
    },
  ],
};
