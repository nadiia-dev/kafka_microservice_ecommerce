import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      res
        .status(403)
        .json({ error: "Unauthorized due to authorization token missing!" });
    }
    const data = await ValidateUser(req.headers.authorization as string);
    req.user = data;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
