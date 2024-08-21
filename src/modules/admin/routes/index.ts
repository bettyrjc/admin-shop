import isAdminGuard from '@/modules/auth/guards/is-admin.guard';
import type { RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from '../../auth/guards/is-authenticated.guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  redirect: { name: 'admin-dashboard' },
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'products',
      name: 'products',
      component: () => import('@/modules/admin/views/ProductsView.vue'),
    },
  ],
};
