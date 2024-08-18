<template>
  <h1 class="mb-4 text-2xl font-semibold">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="fullName" class="block text-gray-600">Name</label>
      <input
        v-model="myForm.fullName"
        ref="fullNameInputRef"
        type="text"
        id="fullName"
        name="fullName"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
      <!-- Username Input -->
      <div class="mb-4">
        <label for="name" class="block text-gray-600">Email</label>
        <input
          v-model="myForm.email"
          ref="emailInputRef"
          type="text"
          id="name"
          name="name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-center text-blue-500">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
const authStore = useAuthStore();
const toast = useToast();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const fullNameInputRef = ref<HTMLInputElement | null>(null);
//variables reactives
const myForm = reactive({
  fullName: '',
  email: '',
  password: '',
});

const onRegister = async () => {
  if (myForm.fullName === '') {
    return fullNameInputRef.value?.focus();
  }
  if (myForm.email === '') {
    return emailInputRef.value?.focus();
  }
  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus();
  }

  const ok = await authStore.register(myForm.fullName, myForm.email, myForm.password);
  console.log({ ok });
  if (ok) return;

  toast.error('Invalid credentials');
};
</script>
