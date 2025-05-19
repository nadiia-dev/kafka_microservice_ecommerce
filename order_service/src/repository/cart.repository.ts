export type CartRepositoryType = {
  createCart: (customerId: number, lineItem: any) => Promise<number>;
  findCart: (id: number) => Promise<any>;
  updateCart: (id: number, qty: number) => Promise<any>;
  deleteCart: (id: number) => Promise<Boolean>;
  clearCartData: (id: number) => Promise<Boolean>;
  findCartByProductId: (customerId: number, productId: number) => Promise<any>;
};

const createCart = (customerId: number, lineItem: any) => {};

const getCart = (id: number) => {};

const updateCart = (id: number, qty: number) => {};

const deleteCart = (id: number) => {};

export const CartRepository: CartRepositoryType = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
