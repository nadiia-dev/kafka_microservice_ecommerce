import axios from "axios";
import { NotFoundError } from "../errors";
import { logger } from "../logger";
import { Product } from "../../dto/product.dto";

const catalogUrl = process.env.CATALOG_URL || "http://localhost:8000";

export const getProductDetails = async (productId: number) => {
  try {
    const resp = await axios.get(`${catalogUrl}/products/${productId}`);
    return resp.data as Product;
  } catch (e) {
    logger.error(e);
    throw new NotFoundError("product not found");
  }
};
