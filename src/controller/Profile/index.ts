import { NextFunction, Request, Response } from "express";
import ProfileService from "../../services/profile";

export default class ProfileController {
  public static async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { file, params: {
        userId
      } } = req;

      if (!file)
        return res.status(400).json({ error: "Missing required information" });

        await ProfileService.uploadAvatar(file.filename, Number(userId)); // ! ZOD VALIDATION

      return res.json(file.filename);
    } catch (error) {
      next(error);
    }
  }
}
