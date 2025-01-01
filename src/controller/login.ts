import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import { authInsertService, userFindService } from "../service/dbservice"
import { LoginResponse } from "../types/login"


export const loginController = async(username: string, password: string): Promise<LoginResponse> => {
    
    if (!username) {
        return { status: 400, data: { message: "Username is required" , error: "invalid_request"}}
    }

    if (!password) {
        return { status: 400, data: { message: "Password is required", error: "invalid_request" } }
    }


    const users = await userFindService(username)

    if (users.length === 0) {
        return { status: 400, data: { message: "Username not found", error: "invalid_username" } }
    }

    const user = users[0]

    const match = bcrypt.compareSync(password, user.password)


    if (!match) {
        return { status: 400, data: { message: "Wrong password", error: "invalid_password" } }
    }

    const authCode = uuid()

    authInsertService(user.username, user.id, authCode)

    return {
        status: 200, data: {
            auth_code: authCode
        }
    }

}