import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email:string, password:string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }
    async registration(name: string, email:string, password:string, password_confirmation:string) {
        try {
            const response = await AuthService.registration(name, email, password, password_confirmation);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }

    async updateUserData(name: string, email:string, currentPassword:string, newPassword:string, newPassword_c:string) {
        try {
            const response = await UserService.updateUserData(name, email, currentPassword, newPassword, newPassword_c);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }

    async resetPassword(email:string) {
        try {
            await AuthService.resetPassword(email);     
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }

    async updatePassword(token:string, newPassword:string, newPassword_c:string) {
        try {
            const response = await AuthService.updatePassword(token, newPassword, newPassword_c);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false)
            this.setUser({} as IUser);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                console.error('Ошибка при запросе:', e.message);
                console.error('Ответ сервера:', e.response?.data);
            } else {
                console.error('Неизвестная ошибка:', e);
            }
        } finally {
            this.setLoading(false);
        }
    }
}