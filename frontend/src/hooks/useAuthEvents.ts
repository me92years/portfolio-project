import { useEffect } from 'react';
import { AuthResponse, saveAuthResponse, selectAuthData } from '../features/auth/authSlice';
import { useLazyResponseQuery } from '../features/auth/authApi';
import { AppDispatch } from '../app/store';
import { useAppSelector } from '../app/hooks';


export const useAuthEvents = ({ dispatch }: {
  dispatch: AppDispatch
}) => {
  const [resposneLogin, { isLoading: authLoading }] = useLazyResponseQuery();;
  const authData = useAppSelector(selectAuthData);

  const status = {
    authData,
    authLoading,
  };

  const events = {
    authenticated: async () => {
      const response: AuthResponse = await resposneLogin().unwrap();;
      if (response) {
        dispatch(saveAuthResponse(response));
      }
    }
  }

  useEffect(() => {
    events.authenticated();
  }, []);

  return {
    status,
  } as {
    status: typeof status,
  }
};

export type AuthEvents = ReturnType<typeof useAuthEvents>;