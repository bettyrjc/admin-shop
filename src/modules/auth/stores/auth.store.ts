import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { checkAuthAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        logout();
        return false;
      }
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
  };
  const register = async (fullname: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullname, email, password);
      if (!registerResponse.ok) {
        logout();
        return false;
      }
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.Noauthenticated;
    token.value = '';
    user.value = undefined;
    return false;
  };

  const checkAuthStatus = async (): Promise<Boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      user.value = statusResp.user;
      token.value = statusResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error(error);
      logout();
      return false;
    }
  };
  return {
    user,
    token,
    authStatus,

    //getters for booleans
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    //  TODO:  admin or not
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    //actions
    login,
    register,
    checkAuthStatus,
    logout,
  };
});
