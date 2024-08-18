import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface Error {
  ok: false;
  message: string;
}
interface Success {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<Success | Error> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ok: false,
        message: 'Cant create a user',
      };
    }

    throw new Error('Something went wrong');
  }
};
