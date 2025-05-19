const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
