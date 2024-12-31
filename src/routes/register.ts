

import { Router } from "express";
import { registerController } from "../controller/register";

const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
    const { username, password} = req.body
        const login = await registerController(username, password)
        res.status(login.status).json(login.data)
})

export default registerRouter;