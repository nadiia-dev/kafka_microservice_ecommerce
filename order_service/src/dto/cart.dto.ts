import { Static, Type } from "@sinclair/typebox";

export const CartSchema = Type.Object({
  productId: Type.Integer(),
  qty: Type.Integer(),
});

export type CartInput = Static<typeof CartSchema>;

export const CartEditSchema = Type.Object({
  id: Type.Integer(),
  qty: Type.Integer(),
});

export type CartEditInput = Static<typeof CartEditSchema>;

type CartLineItem = {
  id: number;
  productId: number;
  itemName: string;
  price: string;
  qty: number;
  variant: string | null;
  createdAt: Date;
  updatedAt: Date;
  availability?: number;
};

export interface CartWithLineItems {
  id: number;
  customerId: number;
  lineItems: CartLineItem[];
  createdAt: Date;
  updatedAt: Date;
}
