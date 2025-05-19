import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";

import cors from "cors";
import { HandleErrorWithLogger, httpLogger } from "./utils";

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use(cartRouter);
app.use(orderRouter);

app.use("/", (_req, res) => {
  res.status(200).json({ message: "I am healthy!" });
});

app.use(HandleErrorWithLogger as ErrorRequestHandler);

export default app;
