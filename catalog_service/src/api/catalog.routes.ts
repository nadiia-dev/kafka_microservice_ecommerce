import express, { NextFunction, Request, Response } from "express";
import { CaltalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { asyncHandler } from "../utils/asyncHandler";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProduct, UpdateProduct } from "../dto/product.dto";

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

router.patch(
  "/products/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(UpdateProduct, req.body);

      const id = parseInt(req.params.id) || 0;
      if (errors) return res.status(400).json(errors);

      const data = await catalogService.updateProduct({ id, ...input });
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

router.get(
  "/products",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);

    try {
      const data = await catalogService.getProducts(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

router.get(
  "/products/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id) || 0;
      const data = await catalogService.getProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

router.delete(
  "/products/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id) || 0;
      const data = await catalogService.deleteProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

router.post(
  "/products/stock",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = await catalogService.getProductStock(req.body.ids);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  })
);

export default router;
