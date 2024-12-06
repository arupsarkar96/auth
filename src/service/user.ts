import { RowDataPacket } from "mysql2"
import pool from "../config/db"
import { User } from "../interface/user"



export const updateUserLocationService = async (uid: string, lat: number | null, lon: number | null) => {
    // Ensure lat and lon are not null before updating
    if (lat === null || lon === null) {
        throw new Error('Invalid location data: latitude and longitude cannot be null');
    }

    // Validate that lat and lon are within valid ranges
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        throw new Error('Invalid location data: latitude or longitude out of range');
    }

    const location = `POINT(${lon} ${lat})`;

    try {
        const sql = 'UPDATE `users` SET `location` = ST_GeomFromText(?), `updated` = NOW()  WHERE `uid` = ?';
        const [rows] = await pool.query(sql, [location, uid]);
    } catch (error) {
        console.error('Error updating user location:', error);
        throw new Error('Database query failed');
    }
}



export const createUserService = async (uid: string, username: string, password: string, name: string, photo: string, hash: string, lat: number | null, lon: number | null) => {
    const location = `POINT(${lon} ${lat})`
    try {
        const sql = 'INSERT INTO `users` (`uid`, `username`, `password`, `name`, `photo`, `hash`, `location`) VALUES (?,?,?,?,?,?,ST_GeomFromText(?))';
        const [rows] = await pool.query(sql, [uid, username, password, name, photo, hash, location]);
    } catch (error) {
        console.error('Error User creation:', error);
        throw new Error('Database query failed');
    }
}

export const findUserByUsernameService = async (username: string): Promise<User | null> => {
    try {
        const sql = 'SELECT * FROM `users` WHERE `username` = :username';
        const [rows] = await pool.query<RowDataPacket[]>(sql, { username });
        if (rows.length === 0) return null;
        return rows[0] as User;
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw new Error('Database query failed');
    }
};