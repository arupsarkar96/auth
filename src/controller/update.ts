import { ApiResponse } from "../interface/login"
import { User } from "../model/User"
import bcrypt from "bcryptjs"


export const updateVisibility = async (uid: string, data: boolean) => {
    try {
        // Fetch user password hash from the database
        const userdb = await User.findOne({
            where: { uid },
            attributes: ["password"], // Only fetch the necessary field
        });

        if (!userdb) {
            return { code: 404, data: "User not found" };
        }

        // Update the about in the database
        const [affectedRows] = await User.update(
            { visibility: data },
            { where: { uid } }
        );

        if (affectedRows === 0) {
            return { code: 500, data: "Failed to update visibility" }; // Fallback in case of an unexpected issue
        }

        return { code: 200, data: "Visibility updated successfully!" };
    } catch (error) {
        console.error("Error updating visibility:", error);
        return { code: 500, data: "Internal Server Error" };
    }
}

export const updateAboutController = async (uid: string, data: string) => {
    try {
        // Fetch user password hash from the database
        const userdb = await User.findOne({
            where: { uid },
            attributes: ["password"], // Only fetch the necessary field
        });

        if (!userdb) {
            return { code: 404, data: "User not found" };
        }

        // Update the about in the database
        const [affectedRows] = await User.update(
            { about: data },
            { where: { uid } }
        );

        if (affectedRows === 0) {
            return { code: 500, data: "Failed to update about" }; // Fallback in case of an unexpected issue
        }

        return { code: 200, data: "About updated successfully!" };
    } catch (error) {
        console.error("Error updating about:", error);
        return { code: 500, data: "Internal Server Error" };
    }
}

export const changePasswordController = async (uid: string, current: string, updated: string): Promise<ApiResponse> => {
    try {
        // Fetch user password hash from the database
        const userdb = await User.findOne({
            where: { uid },
            attributes: ["password"], // Only fetch the necessary field
        });

        if (!userdb) {
            return { code: 404, data: "User not found" };
        }

        const isMatch = await bcrypt.compare(current, userdb.toJSON().password);

        if (!isMatch) {
            return { code: 403, data: "Wrong password" };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(updated, 10);

        // Update the password in the database
        const [affectedRows] = await User.update(
            { password: hashedPassword },
            { where: { uid } }
        );

        if (affectedRows === 0) {
            return { code: 500, data: "Failed to update password" }; // Fallback in case of an unexpected issue
        }

        return { code: 200, data: "Password updated successfully!" };
    } catch (error) {
        console.error("Error updating password:", error);
        return { code: 500, data: "Internal Server Error" };
    }
}