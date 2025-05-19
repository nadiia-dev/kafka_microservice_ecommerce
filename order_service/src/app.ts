import express, { ErrorRequestHandler } from "express";
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";

import cors from "cors";
import { HandleErrorWithLogger, httpLogger, MessageBroker } from "./utils";
import { Producer } from "kafkajs";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  await InitializeBroker();

  app.use(cartRouter);
  app.use(orderRouter);

  app.use("/", (_req, res) => {
    res.status(200).json({ message: "I am healthy!" });
  });

  app.use(HandleErrorWithLogger as ErrorRequestHandler);

  return app;
};
