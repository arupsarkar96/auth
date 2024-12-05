import mysql from 'mysql2/promise';
import configuration from './config';

const pool: mysql.Pool = mysql.createPool({
    uri: configuration.MYSQL,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0, // Unlimited queued requests (optional, adjust as needed)
    multipleStatements: false, // Safer to disable unless absolutely necessary
    connectTimeout: 10000, // Set a timeout to avoid hanging connections (in ms)
    namedPlaceholders: true, // Enable support for named parameters if needed
});

export default pool;
