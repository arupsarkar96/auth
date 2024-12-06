import { generateToken } from '../config/token';
import bcrypt from "bcryptjs"
import { findUserByUsernameService, updateUserLocationService } from '../service/user';
import { getLocation } from '../service/location';


const ACCESS_TOKEN_TTL = "3h"

export const createLoginController = async (username: string, password: string, ip: string) => {
    try {
        // Input validation
        if (!username || !password) {
            return { code: 400, data: { message: "Username and password are required" } };
        }

        // Fetch user by username
        const user = await findUserByUsernameService(username);
        if (!user) {
            return { code: 404, data: { message: "Username not found" } };
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { code: 403, data: { message: "Wrong password" } };
        }

        // Generate token (replace with your actual token generation logic)
        const token = generateToken({ username: username, type: "access" }, ACCESS_TOKEN_TTL, "key1", user.uid);
        const ipdata = await getLocation(ip)
        updateUserLocationService(user.uid, ipdata?.lat!!, ipdata?.lon!!)
        // Success response
        return {
            code: 200, data: {
                token: token,
                user: user
            }
        };

    } catch (error) {
        console.error("Error in login controller:", error);
        return { code: 500, data: { message: "Internal server error" } };
    }
};