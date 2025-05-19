import express, { NextFunction, Request, Response } from "express";
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(cartRouter);
app.use(orderRouter);

app.use("/", (req: Request, res: Response, _: NextFunction) => {
  return res.status(200).json({ message: "I am healthy!" });
});

export default app;
