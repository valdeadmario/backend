import { Order } from "../types/order.type";

const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("pizza.db");

export const getAllOrders = async (sendRes: (data: Order[]) => any) => {
  const sql = "SELECT * FROM pizza_house";
  db.all(sql, (err: string, rows: Order[]) => {
    if (err) {
      return;
    }
    sendRes(rows);
  });
};

export const saveOrder = async (
  sendRes: (data: Order) => any,
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
        return;
      }
      sendRes({
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
