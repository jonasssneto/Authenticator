import { Router } from "express";

import AuthRouter from "./auth";

export default Router()
    .use("/auth", AuthRouter)