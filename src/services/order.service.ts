import * as OrderRepository from "../repositories/order.repository";

import { Order, OrderRequest } from "../types/order.type";
import { getSubsetFromArray } from "../helpers/choosePizza";

export const getOrdersData = async (sendRes: (data: Order[]) => any) => {
  await OrderRepository.getAllOrders(sendRes);
};

export const choosePizza = async (
  sendRes: (data: Order) => any,
  { members, count, pizzas }: OrderRequest
) => {
  const created_at = new Date();
  const filtredArray = pizzas.filter((item: number) => item <= members);
  let sumArray: any[] = [];

  let sum = members;
  if (filtredArray.length) {
    while (!sumArray.length) {
      sumArray = [...getSubsetFromArray(filtredArray, members)];
      if (!sumArray.length) {
        --sum;
      }
    }
  } else {
    sumArray.push(pizzas[0]);
  }
  const response_at = new Date();
  await OrderRepository.saveOrder(sendRes, {
    members,
    taken_pizza_count: sumArray && sumArray[0].length,
    pizza_count: count,
    peace_count: sum,
    created_at,
    response_at
  });
};
