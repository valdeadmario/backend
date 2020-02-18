export type Order = {
  id?: number;
  members: number;
  pizza_count: number;
  peace_count: number;
  taken_pizza_count: number;
  created_at: Date;
  response_at: Date;
};

export type OrderRequest = {
  members: number;
  count: number;
  pizzas: number[];
};

export type ErrorResponse = {
  message: string
}
