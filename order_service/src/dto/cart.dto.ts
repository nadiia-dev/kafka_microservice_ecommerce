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
