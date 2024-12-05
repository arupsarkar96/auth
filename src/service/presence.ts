import pool from "../config/db";


export const insertPresence = async (uid: string, ip: string) => {
    try {
        const sql = 'INSERT INTO `presence` (`user_id`, `ip`) VALUES (?, ?)';
        const [rows] = await pool.query(sql, [uid, ip]);
    } catch (error) {
        console.error('Error Presence creation:', error);
        throw new Error('Database query failed');
    }
}
