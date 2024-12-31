import { Router } from "express";
import { loginController } from "../controller/login";

const loginRoute = Router()



loginRoute.post("/", async(req, res) => {
    const { username, password} = req.body
    const login = await loginController(username, password)
    res.status(login.status).json(login.data)
})

export default loginRoute