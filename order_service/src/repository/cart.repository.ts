import { DB } from "../db/db.connections";
import { carts } from "../db/schema";
import { CartInput } from "../dto/cart.dto";

export type CartRepositoryType = {
  createCart: (input: CartInput) => Promise<{}>;
  // getCart: (id: number) => Promise<any>;
  // updateCart: (id: number, qty: number) => Promise<any>;
  // deleteCart: (id: number) => Promise<Boolean>;
  // clearCartData: (id: number) => Promise<Boolean>;
  // findCartByProductId: (customerId: number, productId: number) => Promise<any>;
};

const createCart = async (input: CartInput): Promise<{}> => {
  const res = await DB.insert(carts)
    .values({ customerId: 123 })
    .returning({ cartId: carts.id });

  return Promise.resolve({ message: "Created" });
};

const getCart = (id: number) => {};

const updateCart = (id: number, qty: number) => {};

const deleteCart = (id: number) => {};

export const CartRepository: CartRepositoryType = {
  createCart,
  // getCart,
  // updateCart,
  // deleteCart,
};
