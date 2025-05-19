import { ExpressApp } from "./app";
import { logger } from "./utils";

const PORT = process.env.PORT || 9002;

export const StartServer = async () => {
  const app = await ExpressApp();
  app.listen(PORT, () => {
    logger.info(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is up");
});
