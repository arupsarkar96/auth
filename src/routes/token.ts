import { Router } from "express";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/token";
import { JwtPayload } from "../types/token";

const tokenRoute = Router()


tokenRoute.post("/", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: "Missing authorization header" });
        return
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Malformed authorization header" });
        return
    }

    try {
        const tokendata: JwtPayload = verifyToken(token);

        // Check if the token is a refresh token
        if (tokendata.aud.length !== 1 || tokendata.aud[0] !== "auth") {
            res.status(403).json({ error: "Invalid token type. Expected refresh token." });
            return
        }

        // Generate a new access token
        const accessToken = generateAccessToken(tokendata.sub);
        const refreshToken = generateRefreshToken(tokendata.sub)

        res.json({ access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});



export default tokenRoute