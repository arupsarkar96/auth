import { Router } from "express";
import { rateLimit } from 'express-rate-limit'
import { createLoginController } from "../../controller/login";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})


const v1Login = Router()

v1Login.use(limiter)

v1Login.post('/', async (req, res) => {
    const { username, password } = req.body
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string);
    const login = await createLoginController(username, password, ip)

    if (login.code === 200) {
        res.status(login.code).json(login.data)
    } else {
        res.status(login.code).send(login.data.message)
    }
})


export default v1Login