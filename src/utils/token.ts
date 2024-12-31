import jwt from 'jsonwebtoken';
import fs from "node:fs"
import { JwtPayload } from '../types/token';


var privateKey = fs.readFileSync('./keys/private.key');


// Function to generate a JWT token
export const generateAccessToken = (
    username: string
): string => {
    return jwt.sign({}, privateKey, {
        algorithm: 'RS256',
        expiresIn: "3h",
        keyid: "1",
        issuer: "https://auth.messant.in",
        subject: username,
        audience: ["auth", "users", "chat", "call"],
    });
};

export const generateRefreshToken = (
    username: string,
): string => {
    return jwt.sign({}, privateKey, {
        algorithm: 'RS256',
        expiresIn: "30d",
        keyid: "1",
        issuer: "https://auth.messant.in",
        subject: username,
        audience: ["auth"],
    });
};

// Function to verify a JWT token
export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, privateKey) as JwtPayload;
    } catch (err) {
        throw new Error('Invalid token');
    }
};