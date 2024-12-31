import express from "express"
import fs from "node:fs"
import bodyParser from "body-parser"
import PrettyLogger from "./utils/pretty"
import configuration from "./config"
import loginRoute from "./routes/login"
import deviceRoute from "./routes/device"
import registerRouter from "./routes/register"
import tokenRoute from "./routes/token"
const app = express()

const Logger = new PrettyLogger()

app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use("/login", loginRoute)
app.use("/device", deviceRoute)
app.use("/register", registerRouter)
app.use("/token", tokenRoute)

const main = () => {
    const publicKey = fs.existsSync("./keys/public.key")
    const privateKey = fs.existsSync("./keys/private.key")

    if (!publicKey || !privateKey) {
        Logger.Error("public.key and private.key missing inside 'keys' directory !")
        return
    }

    const keydata = fs.readFileSync("./keys/public.key")
    const jwtpublickey = {
        keys: [
            {
                kty: 'RSA',
                alg: 'RS256',
                kid: '1',
                use: 'sig',
                n: keydata.toString('base64'), // Modulus
                e: 'AQAB', // Exponent
            },
        ],
    }
    fs.writeFileSync('./public/.well-known/jwks.json', JSON.stringify(jwtpublickey));
    Logger.Info("JWT public key deployed")

    app.listen(configuration.PORT, '0.0.0.0', () => {
        Logger.Success(`Server deployed on ${configuration.PORT}`)
    })
}
main()