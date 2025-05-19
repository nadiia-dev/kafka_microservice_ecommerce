import express, { NextFunction, Request, Response } from "express";
import * as repository from "../repository/cart.repository";
import * as service from "../service/cart.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ValidateRequest } from "../utils/validator";
import { CartInput, CartSchema } from "../dto/cart.dto";

const router = express.Router();
const repo = repository.CartRepository;

router.post(
  "/cart",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = ValidateRequest<CartInput>(req.body, CartSchema);

      if (errors) {
        return res.status(404).json({ errors });
      }

      const input: CartInput = req.body;

      const resp = await service.CreateCart(input, repo);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  })
);

router.get(
  "/cart",
  asyncHandler(async (req: Request, res: Response, _: NextFunction) => {
    const resp = await service.GetCart(req.body, repo);
    return res.status(200).json(res);
  })
);

router.patch(
  "/cart",
  asyncHandler(async (req: Request, res: Response, _: NextFunction) => {
    const resp = await service.UpdateCart(req.body, repo);
    return res.status(200).json(res);
  })
);

router.delete(
  "/cart",
  asyncHandler(async (req: Request, res: Response, _: NextFunction) => {
    const resp = await service.DeleteCart(req.body, repo);
    return res.status(200).json(res);
  })
);

export default router;
