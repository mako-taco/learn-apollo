export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUser = {
  __typename?: "CreateUser";
  id: Scalars["ID"];
};

export type Item = {
  __typename?: "Item";
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  stock: Scalars["Int"];
  price: Scalars["Int"];
};

export type Login = {
  __typename?: "Login";
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createItem: Scalars["ID"];
  createOrder: Scalars["ID"];
  createUser: CreateUser;
  login: Login;
};

export type MutationCreateItemArgs = {
  title: Scalars["String"];
  description: Scalars["String"];
  initialStock: Scalars["Int"];
  price: Scalars["Int"];
};

export type MutationCreateOrderArgs = {
  userId: Scalars["ID"];
  itemIds: Array<Scalars["ID"]>;
  itemQtys: Array<Scalars["ID"]>;
};

export type MutationCreateUserArgs = {
  username: Scalars["String"];
};

export type MutationLoginArgs = {
  username: Scalars["String"];
};

export type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  items: Array<OrderItem>;
  timestamp: Scalars["Int"];
};

export type OrderItem = {
  __typename?: "OrderItem";
  item: Item;
  qty: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  items: Array<Item>;
  orders: Maybe<Array<Order>>;
};

export type QueryItemsArgs = {
  ids: Maybe<Array<Scalars["ID"]>>;
};

export type QueryOrdersArgs = {
  userId: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  orders: Array<Order>;
};
