<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import FullScreenLoader from './modules/common/FullScreenLoader.vue';
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
// react change watch watchEffect
authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
    console.log('Auth status:', state.authStatus);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <full-screen-loader v-if="authStore.isChecking" />
  <RouterView />
  <VueQueryDevtools />
</template>
