import bcrypt from "bcryptjs"
import { userFindService, registerService } from "../service/dbservice"
import { LoginResponse } from "../types/login"
import { loginController } from "./login"



export const registerController = async (username: string, password: string): Promise<LoginResponse> => {

    if (!username) {
        return { status: 400, data: { message: "Username is required", error: "invalid_request" } }
    }

    if (!password) {
        return { status: 400, data: { message: "Password is required", error: "invalid_request" } }
    }


    const users = await userFindService(username)

    if (users.length> 0) {
        return { status: 400, data: { message: "Username already exists", error: "invalid_username" } }
    }


    const hashedPassword = bcrypt.hashSync(password, 10)
    const about: string = "I LOVE PRIVACY !"
    const photo: string = `https://api.dicebear.com/9.x/${getRandomCharacter()}/png?seed=${username}&backgroundColor=${getRandomColor()}&size=512`
    const reg = await registerService(username, hashedPassword, photo, about)
    const login = await loginController(username, password)
    return login
}



function getRandomColor() {
    const colors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function getRandomCharacter() {
    const characters = ['lorelei', 'micah', 'open-peeps', 'croodles', 'adventurer'];
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

const privacyQuotes = [
    "Privacy is not something that I’m merely entitled to, it’s an absolute prerequisite. – Marlon Brando",
    "The right to privacy is the most important thing, not just for individuals but for society at large. – Bruce Schneier",
    "Privacy is dead, and social media hold the smoking gun. – Pete Cashmore",
    "Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety. – Benjamin Franklin",
    "In the end, privacy is not something that you can demand from others. It's something that you have to protect and guard yourself. – Tim Cook",
    "The greatest threat to privacy is not the government, it's the individual who leaks our personal data. – Shoshana Zuboff",
    "When you are in the public eye, your privacy is a luxury you can't afford. – Elena Ferrante",
    "To be left alone is the most precious thing one can ask of the modern world. – Anthony Burgess",
    "Surveillance is the business model of the Internet. – Shoshana Zuboff",
    "Privacy is not about hiding; it's about control. – Edward Snowden"
];

function getRandomPrivacyQuote() {
    const randomIndex = Math.floor(Math.random() * privacyQuotes.length);
    const quote = privacyQuotes[randomIndex];

    // Ensure the quote doesn't exceed 255 characters
    if (quote.length > 255) {
        return quote.substring(0, 255);
    }

    return quote;
}