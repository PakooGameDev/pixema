import $api from "../../../shared/api/client"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../../../shared/api/models/AuthResponse"

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

    static async updateUserData(name: string, email:string, currentPassword:string, newPassword:string, newPassword_confirmation:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/updateUserData', {name, email, currentPassword, newPassword, newPassword_confirmation})
    }
}
   
