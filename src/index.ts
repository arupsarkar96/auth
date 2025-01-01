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