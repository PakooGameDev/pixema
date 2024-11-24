import $api from "../http"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/response/AuthResponse"
import { IUser } from "../models/IUser"

export default class UserService {

    static async updateUserData(name: string, email:string, currentPassword:string, newPassword:string, newPassword_c:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/updateUserData', {name, email, currentPassword, newPassword, newPassword_c})
    }

    static async getUserName(): Promise<AxiosResponse<string|any>> {
        return $api.get<string|any>('/getUserData')
    }
}