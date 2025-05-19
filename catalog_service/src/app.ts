import express, { ErrorRequestHandler } from "express";
import catalogRouter from "./api/catalog.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", catalogRouter);
app.use(HandleErrorWithLogger as ErrorRequestHandler);

export default app;
