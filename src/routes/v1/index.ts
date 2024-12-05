import { Router } from "express";
import v1Registration from "./registration";
import v1Login from "./login";
import v1Check from "./check";

const v1Route = Router();


v1Route.use('/registration', v1Registration)
v1Route.use('/login', v1Login)
v1Route.use('/check', v1Check)


export default v1Route;