import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
    uid: string; // Unique user identifier
    username: string;
    password: string;
    photo: string; // Optional field
    about: string; // Optional field
    verified: boolean;
    visibility: boolean;
    location: { type: "Point"; coordinates: [number, number] }; // GeoJSON object for the user's location
}

export class User extends Model<UserAttributes> { }

User.init(
    {
        uid: {
            type: DataTypes.STRING(20),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // Ensure unique usernames
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Default visibility
        },
        location: {
            type: DataTypes.GEOMETRY("POINT"), // Store as a geographical POINT
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);
