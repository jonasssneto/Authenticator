import { Router } from "express";

import AuthRouter from "./auth";
import profileRouter from "./Profile";

export default Router()
    .use("/auth", AuthRouter)
    .use("/profile", profileRouter);