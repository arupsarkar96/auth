
export interface JwtPayload {
    iat: number; // Issued At: Timestamp when the token was issued
    exp: number; // Expiration Time: Timestamp when the token will expire
    aud: string[]; // Audience: An array of allowed audiences
    iss: string; // Issuer: The entity that issued the token
    sub: string; // Subject: The subject or principal the token is issued for
}