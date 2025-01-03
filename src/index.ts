import express from "express"
import fs from "node:fs"
import morgan from "morgan"
import bodyParser from "body-parser"
import jose from "node-jose"
import PrettyLogger from "./utils/pretty"
import configuration from "./config"
import loginRoute from "./routes/login"
import deviceRoute from "./routes/device"
import registerRouter from "./routes/register"
import tokenRoute from "./routes/token"
import { verifyToken } from "./utils/token"
import { JwtPayload } from "./types/token"
import { presenceController } from "./controller/presence"
const app = express()

const Logger = new PrettyLogger()

app.set('trust proxy', '192.168.1.100');
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("common"))

app.use("/login", loginRoute)
app.use("/device", deviceRoute)
app.use("/register", registerRouter)
app.use("/token", tokenRoute)

app.post("/introspect", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authorization token missing or malformed' });
        return
    }

    const token = authHeader.split(' ')[1];

    // Decode the token without verifying to extract the issuer
    try {
        const verify: JwtPayload = verifyToken(token)

        if (verify.aud.includes("auth")) {
            res.sendStatus(200)
            presenceController(verify.sub, "160.238.95.138")
        } else {
            res.status(401).json({ error: 'Token misuse' });
        }

    } catch (error) {
        res.status(401).json({ error: 'Token expired !' });
    }

})

const main = async() => {
    const publicKey = fs.existsSync("./keys/public.key")
    const privateKey = fs.existsSync("./keys/private.key")

    if (!publicKey || !privateKey) {
        Logger.Error("public.key and private.key missing inside 'keys' directory !")
        return
    }

    const keydata = fs.readFileSync("./keys/public.key", "utf8")
    const key = await jose.JWK.asKey(keydata, 'pem');
    const jwk = key.toJSON() as any;
    jwk.kid = '1';
    
    const jwks = {
        keys: [jwk],
    };
    fs.writeFileSync('./public/.well-known/jwks.json', JSON.stringify(jwks, null, 2));
    Logger.Info("JWT public key deployed")

    app.listen(configuration.PORT, '0.0.0.0', () => {
        Logger.Success(`Server deployed on ${configuration.PORT}`)
    })
}
main()