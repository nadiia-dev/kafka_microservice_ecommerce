import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("RequestAuthorizer called", req.headers.authorization);
  try {
    if (!req.headers.authorization) {
      res
        .status(403)
        .json({ error: "Unauthorized due to authorization token missing!" });
    }
    const userData = await ValidateUser(req.headers.authorization as string);
    req.user = userData;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(403).json({ error });
  }
};
