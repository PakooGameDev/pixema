import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Замените на ваш URL

interface RegisterData {
 name: string;
 email: string;
 password: string;
 password_confirmation: string;
}

export const register = async (userData: RegisterData) => {
 try {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
 } catch (error: any) {
  throw new Error(error.response?.data?.message || error.message);
 }
};

interface LoginData {
 email: string;
 password: string;
}

export const login = async (userData: LoginData) => {
    return await axios.post(`${API_URL}/login`, userData);
};

export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${API_URL}/refresh`, { token: refreshToken });
        return response.data.access_token;
    } catch (error: any) {
        console.error('Error refreshing token:', error);
        return null; // Возвращаем null в случае ошибки
    }
};

export const logout = async () => {
    return await axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });
};

export const sendResetLink = async (email: string) => {
 try {
  const response = await axios.post(`${API_URL}/password/reset/link`, { email });
  return response.data;
 } catch (error: any) {
  throw new Error(error.response?.data?.message || 'Ошибка при отправке ссылки');
 }
};

export const getResetToken = async (token: string) => {
 try {
  const response = await axios.get(`${API_URL}/password/reset/${token}`);
  return response.data;
 } catch (error: any) {
  throw new Error(error.response?.data?.message || 'Ошибка получения токена');
 }
};

interface ResetPasswordData {
 token: string;
 password: string;
 password_confirmation: string;
}

export const resetPassword = async (data: ResetPasswordData) => {
 try {
  const response = await axios.post(`${API_URL}/password/reset`, data);
  return response.data;
 } catch (error: any) {
  throw new Error(error.response?.data?.message || 'Ошибка при сбросе пароля');
 }
};
