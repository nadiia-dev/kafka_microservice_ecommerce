import axios from "axios";
import { AuthorizeError, NotFoundError } from "../errors";
import { logger } from "../logger";
import { Product } from "../../dto/product.dto";
import { User } from "../../dto/user.model";

const catalogUrl = process.env.CATALOG_URL || "http://localhost:8000";
const authUrl = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000";

export const getProductDetails = async (productId: number) => {
  try {
    const resp = await axios.get(`${catalogUrl}/products/${productId}`);
    return resp.data as Product;
  } catch (e) {
    logger.error(e);
    throw new NotFoundError("product not found");
  }
};

export const GetStockDetails = async (ids: number[]) => {
  try {
    const response = await axios.post(`${catalogUrl}/products/stock`, {
      ids,
    });
    return response.data as Product[];
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("error on getting stock details");
  }
};

export const ValidateUser = async (token: string) => {
  try {
    console.log("ValidateUser called", token);
    const response = await axios.get(`${authUrl}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("response", response.data);

    if (response.status !== 200) {
      throw new AuthorizeError("user not authorised");
    }
    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not authorised");
  }
};
