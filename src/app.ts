import express from "express";
import { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/googleRouter");
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server Start");
});
