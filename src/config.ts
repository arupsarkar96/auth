import * as dotenv from "dotenv"
dotenv.config()
const configuration = {
    PORT: Number(process.env.PORT) || 8081,
    MYSQL: process.env.MYSQL || ""
}

export default configuration