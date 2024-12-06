import { uniqueNamesGenerator, Config, colors, animals } from 'unique-names-generator';
import { User } from "../interface/user"
import { createUserService, findUserByUsernameService } from "../service/user"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs"
import IceId from "iceid";
import configuration from "../config/config";
import { createLoginController } from './login';
import { getLocation } from '../service/location';

const generator = new IceId(configuration.DATACENTER, configuration.MACHINE_ID);

const config: Config = {
    dictionaries: [colors, animals],
    separator: ' ',
    style: 'capital'
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

export const createAccountController = async (username: string, password: string, ip: string) => {
    const user: User | null = await findUserByUsernameService(username)

    if (!username || !password) {
        return { code: 400, data: { message: "Username and password are required" } };
    }


    if (user === null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const characterName: string = uniqueNamesGenerator(config)
        const ipdata = await getLocation(ip)
        const photo: string = `https://api.dicebear.com/9.x/${getRandomCharacter()}/png?seed=${characterName}&backgroundColor=${getRandomColor()}`

        const reg = await createUserService(generator.generate(), username, hashedPassword, characterName, photo, uuidv4(), ipdata?.lat!!, ipdata?.lon!!)


        const login = await createLoginController(username, password, ip)
        return login
    } else {
        return { code: 409, data: { message: "Account already in use" } };
    }
}