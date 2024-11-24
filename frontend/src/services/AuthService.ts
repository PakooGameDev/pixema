import $api from "../http"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/response/AuthResponse"

export default class AuthService {
    static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email,password})
    }

    static async registration(name:string, email:string, password:string, password_confirmation: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/register', {name,email,password,password_confirmation})
    }

    static async updatePassword(token:string, password:string, password_confirmation: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/password/reset', {token,password,password_confirmation})
    }

    static async resetPassword(email:string): Promise<void> {
        return $api.post('/password/reset/link', {email})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}
   
