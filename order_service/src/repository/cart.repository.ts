import { DB } from "../db/db.connections";
import { carts } from "../db/schema";

export type CartRepositoryType = {
  createCart: (customerId: number, lineItem: any) => Promise<{}>;
  getCart: (id: number) => Promise<any>;
  updateCart: (id: number, qty: number) => Promise<any>;
  deleteCart: (id: number) => Promise<Boolean>;
  clearCartData: (id: number) => Promise<Boolean>;
  findCartByProductId: (customerId: number, productId: number) => Promise<any>;
};

const createCart = async (customerId: number, lineItem: any): Promise<{}> => {
  const res = await DB.insert(carts)
    .values({ customerId })
    .returning({ cartId: carts.id });

  return Promise.resolve({ message: "Created" });
};

const getCart = (id: number) => {};

const updateCart = (id: number, qty: number) => {};

const deleteCart = (id: number) => {};

export const CartRepository: CartRepositoryType = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
