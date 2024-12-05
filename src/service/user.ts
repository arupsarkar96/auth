import { RowDataPacket } from "mysql2"
import pool from "../config/db"
import { User } from "../interface/user"




export const createUserService = async (uid: string, username: string, password: string, name: string, photo: string, hash: string) => {
    try {
        const sql = 'INSERT INTO `users` (`uid`, `username`, `password`, `name`, `photo`, `hash`) VALUES (?,?,?,?,?,?)';
        const [rows] = await pool.query(sql, [uid, username, password, name, photo, hash]);
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