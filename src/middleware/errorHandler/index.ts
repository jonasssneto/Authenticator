import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  return res.status(500).json({
    error: error.message,
  });
};

export { errorHandler };

