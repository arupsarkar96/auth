import mysql from "mysql2/promise"
import configuration from "../config";

const database = mysql.createPool(configuration.MYSQL)

export default database;