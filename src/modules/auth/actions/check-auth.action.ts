import { tesloApi } from '@/api/tesloApi';
import type { User } from '../interfaces';
import { isAxiosError } from 'axios';
interface Error {
  ok: false;
}
interface Success {
  ok: true;
  user: User;
  token: string;
}
export const checkAuthAction = async (): Promise<Success | Error> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { ok: false };
    }
    const { data } = await tesloApi.get('/auth/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('Something went wrong');
  }
};
