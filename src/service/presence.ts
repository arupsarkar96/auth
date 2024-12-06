import pool from "../config/db";


export const addPresenceService = async (uid: string, ip: string, country: string | null, countryCode: string | null, region: string | null, regionCode: string | null, city: string | null, lat: number | null, lon: number | null) => {
    try {
        const sql = 'INSERT INTO `presence` (`user_id`, `ip`, `country`, `country_code`, `region`, `region_code`, `city`, `lat`, `lon`) VALUES (?,?,?,?,?,?,?,?,?)';
        const [rows] = await pool.query(sql, [uid, ip, country, countryCode, region, regionCode, city, lat, lon]);
    } catch (error) {
        console.error('Error Presence creation:', error);
        throw new Error('Database query failed');
    }
}
