import app from "./app";

const PORT = process.env.APP_PORT || 8000;

export const StartServer = async () => {
  app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
