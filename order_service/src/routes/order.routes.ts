import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post(
  "/order",
  asyncHandler(async (req: Request, res: Response, _: NextFunction) => {})
);

export default router;
