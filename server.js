const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connect");
const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipe");
const userRouter = require("./routes/user");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const isAuthenticated = require("./middlewares/authentication");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", isAuthenticated, recipeRouter);
app.use("/api/v1/users", isAuthenticated , userRouter);

app.use(notFound);
app.use(errorHandler);

connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
