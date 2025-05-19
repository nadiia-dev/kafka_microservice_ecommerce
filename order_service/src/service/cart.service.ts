import { CartLineItem } from "../db/schema";
import { CartEditInput, CartInput } from "../dto/cart.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { NotFoundError } from "../utils";
import { getProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartInput & { customerId: number },
  repo: CartRepositoryType
) => {
  const product = await getProductDetails(input.productId);

  if (product.stock < input.qty) {
    throw new NotFoundError("Product is out of stock");
  }

  return await repo.createCart(input.customerId, {
    productId: product.id,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: product.variant,
  } as CartLineItem);
};

export const UpdateCart = async (
  input: CartEditInput & { customerId: number },
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const DeleteCart = async (
  input: { id: number; customerId: number },
  repo: CartRepositoryType
) => {
  const data = repo.deleteCart(input.id);
  return data;
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const data = repo.getCart(id);
  if (!data) {
    throw new NotFoundError("Cart not found");
  }
  return data;
};
