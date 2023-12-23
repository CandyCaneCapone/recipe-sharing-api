const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connect")

dotenv.config();
const app = express();

app.use(express.json())

connect()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
