import express, { NextFunction, Request, Response } from "express";
import * as repository from "../repository/cart.repository";
import * as service from "../service/cart.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ValidateRequest } from "../utils/validator";
import { CartInput, CartSchema } from "../dto/cart.dto";
import { AuthMiddleware } from "./middleware";

const router = express.Router();
const repo = repository.CartRepository;

router.post(
  "/cart",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }

      const error = ValidateRequest<CartInput>(req.body, CartSchema);

      if (error) {
        return res.status(404).json({ error });
      }

      const input: CartInput = req.body;

      const response = await service.CreateCart(
        {
          ...input,
          customerId: user.id,
        },
        repo
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  })
);

router.get(
  "/cart",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const resp = await service.GetCart(user.id, repo);
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  })
);

router.patch(
  "/cart/:id",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const liteItemId = req.params.lineItemId;
      const resp = await service.UpdateCart(
        {
          id: +liteItemId,
          qty: req.body.qty,
          customerId: user.id,
        },
        repo
      );
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  })
);

router.delete(
  "/cart/:lineItemId",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        next(new Error("User not found"));
        return;
      }
      const liteItemId = req.params.lineItemId;
      const resp = await service.DeleteCart(
        { customerId: user.id, id: +liteItemId },
        repo
      );
      return res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  })
);

export default router;
