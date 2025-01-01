import { authDeleteService, authGetService, deviceInsertService, userFindService } from "../service/dbservice"
import { DeviceAuth, DeviceResponse } from "../types/device"
import { User } from "../types/login"
import { generateAccessToken, generateRefreshToken } from "../utils/token"
import {v4 as uuid} from "uuid"


export const deviceController = async (auth_code: string, fcm_token: string, public_key: string): Promise<DeviceResponse> => {
    
    if (!auth_code || !fcm_token || !public_key) {
        return {status:400, data: {message: "AUTH_CODE, FCM_TOKEN, PUBLIC_KEY missing "}}
    }
    const auths: DeviceAuth[] = await authGetService(auth_code)

    if (auths.length === 0) {
        return { status: 400, data: { message: "AUTH_CODE wrong " } }
    }

    authDeleteService(auths[0].auth_id)
    deviceInsertService(auths[0].user_id, fcm_token, public_key, uuid())

    const users: User[] = await userFindService(auths[0].username)
    const user = users[0]
    return {
        status: 200, data: {
            user: {
                display_name: user.display_name,
                username: user.username,
                about: user.about,
                photo: user.photo,
                verified: user.verified
            },
            access_token: generateAccessToken(auths[0].username),
            refresh_token: generateRefreshToken(auths[0].username)
        }
    }
}