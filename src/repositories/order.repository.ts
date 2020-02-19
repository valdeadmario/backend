import { Order, ErrorResponse } from "../types/order.type";

const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("pizza.db");

export const getAllOrders = async (
  sendRes: (status: number, data: Order[] | ErrorResponse) => void
) => {
  const sql = "SELECT * FROM pizza_house";
  db.all(sql, (err: string, rows: Order[]) => {
    if (err) {
      sendRes(400, { message: "Something went wrong with db" });
      return;
    }
    sendRes(200, rows);
  });
};

export const saveOrder = async (
  sendRes: (status: number, data: Order | ErrorResponse) => void,
  {
    members,
    taken_pizza_count,
    pizza_count,
    peace_count,
    created_at,
    response_at
  }: Order
) => {
  await db.run(
    "INSERT INTO pizza_house (members, taken_pizza_count,pizza_count, peace_count, created_at, response_at) VALUES ($members, $taken_pizza_count, $pizza_count, $peace_count, $created_at, $response_at)",
    {
      $members: members,
      $taken_pizza_count: taken_pizza_count,
      $pizza_count: pizza_count,
      $peace_count: peace_count,
      $created_at: created_at,
      $response_at: response_at
    },
    function(err: string) {
      if (err) {
        sendRes(400, { message: "Something went wrong with db" });
        return;
      }
      sendRes(200, {
        id: this.lastID,
        members,
        taken_pizza_count,
        pizza_count,
        peace_count,
        created_at,
        response_at
      });
    }
  );
};
