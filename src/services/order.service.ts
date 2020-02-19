import * as OrderRepository from "../repositories/order.repository";

import { Order, OrderRequest, ErrorResponse } from "../types/order.type";
import { findSum } from "../helpers/choosePizza";

export const getOrdersData = async (
  sendRes: (status: number, data: Order[] | ErrorResponse) => void
) => {
  await OrderRepository.getAllOrders(sendRes);
};

export const choosePizza = async (
  sendRes: (status: number, data: Order | ErrorResponse) => void,
  { members, count, pizzas }: OrderRequest
) => {
  const created_at = new Date();
  const filteredArray = pizzas.filter((item: number) => item && item <= members );

  const arrSum = filteredArray.reduce((acc, curr) => acc + curr, 0);
  let sumArray: number[][] = [];

  let sum = members;
  if (filteredArray.length) {
    while (!sumArray.length) {
      let data = findSum(
        filteredArray,
        arrSum - sum < sum ? arrSum - sum : sum
      );
      data && sumArray.push(data);
      if (!sumArray.length) {
        --sum;
      }
    }
  } else {
    sumArray.push([pizzas[0]]);
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
