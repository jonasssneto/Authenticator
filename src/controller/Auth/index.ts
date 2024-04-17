import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth";
import PasswordService from "../../services/auth/Password";

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

  public static async forgot(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { email },
      } = req;

      if (!email) return res.status(400).json({ error: "Missing required information" });

      const forgot = await PasswordService.forgot(email);

      return res.json(forgot);
    } catch (error) {
      next(error);
    }
  }

  public static async reset(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { token, password },
      } = req;

      if (!token || !password)
        return res.status(400).json({ error: "Missing required information" });

      const reset = await PasswordService.reset(token, password);

      return res.json(reset);
    } catch (error) {
      next(error);
    }
  }
}
