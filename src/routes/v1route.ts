import { Router } from "express";
import { rateLimit } from 'express-rate-limit'
import { createAccountController } from "../controller/registration";
import { accessHistory, createLoginController } from "../controller/login";
import { authTokenChecker } from "../middleware/auth";
import { changePasswordController, updateAboutController, updateVisibility } from "../controller/update";

const v1Route = Router();


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})



v1Route.post('/register', limiter, async (req, res) => {
    const { username, password } = req.body
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string);
    const response = await createAccountController(username, password, ip)

    if (response.code === 200) {
        res.status(response.code).json(response.data)
    } else {
        res.status(response.code).send(response.data)
    }
})

v1Route.post('/login', limiter, async (req, res) => {
    const { username, password } = req.body
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string);
    const login = await createLoginController(username, password, ip)

    if (login.code === 200) {
        res.status(login.code).json(login.data)
    } else {
        res.status(login.code).send(login.data)
    }
})

v1Route.get('/presence', authTokenChecker, async (req, res) => {
    const uid: string = req.headers["x-uid"] as string
    const ip: string = (req.headers['x-forwarded-for'] as string) || (req.ip as string)
    accessHistory(ip, uid)
    res.sendStatus(200)
})

v1Route.patch('/update/password', authTokenChecker, async (req, res) => {
    const { current, updated } = req.body
    const uid: string = req.headers["x-uid"] as string
    const response = await changePasswordController(uid, current, updated)
    res.status(response.code).send(response.data)
})

v1Route.patch('/update/about', authTokenChecker, async (req, res) => {
    const { data } = req.body
    const uid: string = req.headers["x-uid"] as string
    const response = await updateAboutController(uid, data)
    res.status(response.code).send(response.data)
})

v1Route.patch('/update/visibility', authTokenChecker, async (req, res) => {
    const { data }: { data: boolean } = req.body
    const uid: string = req.headers["x-uid"] as string
    const response = await updateVisibility(uid, data)
    res.status(response.code).send(response.data)
})

export default v1Route;