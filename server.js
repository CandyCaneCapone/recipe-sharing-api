const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connect");
const authRouter = require("./routes/auth");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
