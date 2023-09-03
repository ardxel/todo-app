import { AxiosError } from 'axios';
import { Response, http } from 'config/api';
import { IUser } from 'config/models';
import { useState } from 'react';

export const useAuth = function <T extends 'sign-up' | 'sign-in', P extends Record<string, string>>(type: T) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const call = async (body: P) => {
    let user;
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await http.post<Response<{ user: IUser; access_token: string }>>('/auth/' + type, body);
      const token = response.data.payload.access_token;
      localStorage.setItem('token', token);
      if (response.data.payload.user) {
        user = response.data.payload.user;
      }
      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const { error: errorMsg } = error.response!.data;
        setError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
    return user;
  };

  return { error, isLoading, call };
};
