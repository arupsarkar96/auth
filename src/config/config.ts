import * as dotenv from 'dotenv';
dotenv.config();

if (
    !process.env.PORT ||
    !process.env.MYSQL ||
    !process.env.JWT_SECRET ||
    !process.env.DATACENTER ||
    !process.env.MACHINE_ID
) {
    throw new Error('Missing required environment variables');
}

export interface ServerConfiguration {
    PORT: number;
    MYSQL: string;
    JWT_SECRET: string;
    DATACENTER: number;
    MACHINE_ID: number;
}

const configuration: ServerConfiguration = {
    PORT: Number(process.env.PORT),
    MYSQL: process.env.MYSQL,
    JWT_SECRET: process.env.JWT_SECRET,
    DATACENTER: Number(process.env.DATACENTER),
    MACHINE_ID: Number(process.env.MACHINE_ID)
};

export default configuration;
