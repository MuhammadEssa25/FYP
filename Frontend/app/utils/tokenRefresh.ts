// app/utils/tokenRefresh.ts
import { authApi } from '@/app/Redux/authApi';

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return null;

  try {
    const response = await authApi.endpoints.refreshToken.initiate(refreshToken);
    if ('data' in response) {
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};