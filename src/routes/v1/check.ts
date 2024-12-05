import { Router } from "express";
import { authTokenChecker } from "../../middleware/auth";
import { insertPresence } from "../../service/presence";

const v1Check = Router()


v1Check.get('/', authTokenChecker, async (req, res) => {
    const uid: string = req.headers["x-uid"] as string
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string)
    insertPresence(uid, ip)
    res.sendStatus(200)
})


export default v1Check;