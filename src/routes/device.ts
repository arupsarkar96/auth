import { Router } from "express";
import { deviceController } from "../controller/device";


const deviceRoute = Router()


deviceRoute.post("/", async (req, res)=>{
    const { auth_code, fcm_token, public_key } = req.body
    const auth = await deviceController(auth_code, fcm_token, public_key)
    res.status(auth.status).json(auth.data)
})


export default deviceRoute