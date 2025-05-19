import { CartLineItem } from "../db/schema";
import { CartEditInput, CartInput } from "../dto/cart.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { AuthorizeError, NotFoundError } from "../utils";
import { getProductDetails, GetStockDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartInput & { customerId: number },
  repo: CartRepositoryType
) => {
  const product = await getProductDetails(input.productId);

  if (product.stock < input.qty) {
    throw new NotFoundError("Product is out of stock");
  }

  const lineItem = await repo.findCartByProductId(
    input.customerId,
    input.productId
  );
  if (lineItem) {
    return repo.updateCart(lineItem.id, lineItem.qty + input.qty);
  }

  return await repo.createCart(input.customerId, {
    productId: product.id,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: product.variant,
  } as CartLineItem);
};

const AuthorisedCart = async (
  lineItemId: number,
  customerId: number,
  repo: CartRepositoryType
) => {
  const cart = await repo.getCart(customerId);
  if (!cart) {
    throw new NotFoundError("cart does not exist");
  }

  const lineItem = cart.lineItems.find((item) => item.id === lineItemId);
  if (!lineItem) {
    throw new AuthorizeError("you are not authorized to edit this cart");
  }

  return lineItem;
};

export const UpdateCart = async (
  input: CartEditInput & { customerId: number },
  repo: CartRepositoryType
) => {
  await AuthorisedCart(input.id, input.customerId, repo);
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const DeleteCart = async (
  input: { id: number; customerId: number },
  repo: CartRepositoryType
) => {
  await AuthorisedCart(input.id, input.customerId, repo);
  const data = repo.deleteCart(input.id);
  return data;
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.getCart(id);
  if (!data) {
    throw new NotFoundError("Cart not found");
  }

  const lineItems = data.lineItems;

  if (!lineItems.length) {
    throw new NotFoundError("cart items not found");
  }
  const stockDetails = await GetStockDetails(
    lineItems.map((item) => item.productId)
  );

  if (Array.isArray(stockDetails)) {
    lineItems.forEach((lineItem) => {
      const stockItem = stockDetails.find(
        (stock) => stock.id === lineItem.productId
      );
      if (stockItem) {
        lineItem.availability = stockItem.stock;
      }
    });

    data.lineItems = lineItems;
  }

  return data;
};
