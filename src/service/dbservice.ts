import { DeviceAuth } from "../types/device";
import { User } from "../types/login";
import database from "../utils/db";
import PrettyLogger from "../utils/pretty";

const Logger = new PrettyLogger()

export const loginService = async (username: string): Promise<User[]> => {
    const sql = "SELECT * FROM `users` WHERE `username` = ?"
    try {
        const [rows] = await database.query(sql, [username])
        return rows as User[]
    } catch (error: any) {
        Logger.Error(error.message)
        return []
    }
}

export const authInsertService = async (username: string, userid: number, authCode: string) => {
    const sql = "INSERT INTO `auths`(`auth_id`, `user_id`, `username`) VALUES (?,?,?)"

    try {
        const [rows] = await database.query(sql, [authCode, userid, username])
    } catch (error: any) {
        Logger.Error(error.message)
    }
}

export const authGetService = async (auth_code: string): Promise<DeviceAuth[]> => {
    const sql = "SELECT * FROM `auths` WHERE `auth_id` = ?"
    try {
        const [rows] = await database.query(sql, [auth_code])
        return rows as DeviceAuth[]
    } catch (error: any) {
        Logger.Error(error.message)
        return []
    }
}

export const authDeleteService = async (auth_code: number) => {
    const sql = "DELETE FROM `auths` WHERE `auth_id` = ?"
    try {
        const [rows] = await database.query(sql, [auth_code])
    } catch (error: any) {
        Logger.Error(error.message)
    }
}

export const deviceInsertService = async (userId: number, fcm: string, public_key: string, device_id: string) => {
    const sql = "INSERT INTO `devices` (`device_id`, `user_id`, `fcm_token`, `public_key`) VALUES (?,?,?,?)"
    try {
        const [rows] = await database.query(sql, [device_id, userId, fcm, public_key])
    } catch (error: any) {
        Logger.Error(error.message)
    }
}

export const registerService = async (username: string, hashedPassword: string, photo: string, about: string): Promise<boolean> => {
    const sql = "INSERT INTO `users` (`username`, `password`, `photo`, `about`) VALUES (?,?,?,?)"
    try {
        const [rows] = await database.query(sql, [username, hashedPassword, photo, about])
        return true
    } catch (error: any) {
        Logger.Error(error.message)
        return false
    }
}