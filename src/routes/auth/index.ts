import { Router } from "express";
import AuthController from "../../controller/Auth";
import { validator } from "../../middleware/validator";
import { create, forgot, login, reset } from "../../middleware/validator/schemas/Auth";

export default Router()
  .post("/create", validator(create), AuthController.create)
  .post("/login", validator(login), AuthController.login)
  .post("/forgot", validator(forgot), AuthController.forgot)
  .post("/reset", validator(reset), AuthController.reset);
