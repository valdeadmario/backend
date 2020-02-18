import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";

import * as OrderService from "./services/order.service";

import { Order, ErrorResponse } from "./types/order.type";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  const sendRes = (status: number, data: Order[] | ErrorResponse) =>
    res.status(status).send(data);
  OrderService.getOrdersData(sendRes);
});

app.post("/", upload.single("file"), (req, res) => {
  const buffer = req.file.buffer;
  const [members, count, ...pizzas] = buffer
    .toString()
    .split("\n")
    .join(" ")
    .split(" ");
  const sendRes = (status: number, data: Order | ErrorResponse) =>
    res.status(status).send(data);
  OrderService.choosePizza(sendRes, {
    members: Number(members),
    count: Number(count),
    pizzas: pizzas.map(item => Number(item))
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
