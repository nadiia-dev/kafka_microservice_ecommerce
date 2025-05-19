import express, { NextFunction, Request, Response } from "express";
import { CaltalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { asyncHandler } from "../utils/asyncHandler";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProduct } from "../dto/product.dto";

const router = express.Router();

const catalogService = new CaltalogService(new CatalogRepository());

router.post(
  "/products",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(CreateProduct, req.body);

      if (errors) return res.status(400).json(errors);
      const data = await catalogService.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

export default router;
