import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { OrderRepository } from "../repository/order.repositiory";
import { CartRepository } from "../repository/cart.repository";
import { AuthMiddleware } from "./middleware";
import * as service from "../service/order.service";
import { OrderStatus } from "../types";

const repo = OrderRepository;
const cartRepo = CartRepository;
const router = express.Router();

router.post(
  "/orders",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const response = await service.CreateOrder(user.id, repo, cartRepo);
    return res.status(200).json(response);
  })
);

router.get(
  "/orders",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const response = await service.GetOrders(user.id, repo);
    return res.status(200).json(response);
  })
);

router.get(
  "/orders/:id",
  AuthMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const id = Number(req.params.id) || 0;
    if (!id) {
      next(new Error("id not provided"));
      return;
    }

    const response = await service.GetOrder(id, repo);
    return res.status(200).json(response);
  })
);

router.patch(
  "/orders/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const orderId = parseInt(req.params.id);
    const status = req.body.status as OrderStatus;
    const response = await service.UpdateOrder(orderId, status, repo);
    return res.status(200).json(response);
  })
);

router.delete(
  "/orders/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }
    const orderId = parseInt(req.params.id);
    const response = await service.DeleteOrder(orderId, repo);
    return res.status(200).json(response);
  })
);

router.get(
  "/orders/:id/checkout",
  asyncHandler(async (req: Request, res: Response) => {
    const orderNumber = parseInt(req.params.id);
    const response = await service.CheckoutOrder(orderNumber, repo);
    return res.status(200).json(response);
  })
);

export default router;
