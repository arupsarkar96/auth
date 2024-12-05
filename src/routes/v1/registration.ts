import { Router } from "express";
import { createAccountController } from "../../controller/registration";
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const v1Registration = Router()
v1Registration.use(limiter)


v1Registration.post('/', async (req, res) => {
    const { username, password } = req.body
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string);

    const response = await createAccountController(username, password, ip)

    if (response.code === 200) {
        res.status(response.code).json(response.data)
    } else {
        res.status(response.code).send(response.data.message)
    }
})

export default v1Registration