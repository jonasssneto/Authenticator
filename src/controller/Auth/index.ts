import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth";

export default class AuthController {
  public static async create(req: Request, res: Response,next: NextFunction) {
    try {
      const {
        body: { email, password, username },
      } = req;
  
      if (!email || !password || !username)
        return res.status(400).json({ error: "Missing required information" });
  
      const create = await AuthService.create({ email, password, username });
  
      return res.json(create);
    } catch (error) {
      next(error)
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { username, password },
      } = req;

      if (!username || !password)
        return res.status(400).json({ error: "Missing required information" });

      const login = await AuthService.login({ username, password });

      return res.json(login);
    } catch (error) {
      next(error);
    }
  }
}
