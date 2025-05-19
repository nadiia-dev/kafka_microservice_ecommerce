import { CartInput } from "../dto/cart.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { NotFoundError } from "../utils";
import { getProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartInput,
  repo: CartRepositoryType
) => {
  const product = await getProductDetails(input.productId);

  if (product.stock < input.qty) {
    throw new NotFoundError("Product is out of stock");
  }

  // const data = repo.createCart(input);
  // return data;
  return product;
};

export const UpdateCart = async (input: any, repo: CartRepositoryType) => {
  // const data = repo.updateCart(input);
  // return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  // const data = repo.deleteCart(input);
  // return data;
};

export const GetCart = async (input: any, repo: CartRepositoryType) => {
  // const data = repo.getCart(input);
  // return data;
};
