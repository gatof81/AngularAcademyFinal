import { User } from './user';
import {Product} from './product';
import {Order} from './order';

export interface DataUser {
  user: User
}

export interface DataProducts {
  products: Array<Product>
}

export interface DataAllUsers {
  allUsers: Array<User>
}

export interface DataOrders {
  orders: Array<Order>
}

export const defaultsUser: DataUser = {
  user: {}
};

export const defaultsProducts: DataProducts = {
  products: []
};

export const defaultsAllUsers: DataAllUsers = {
  allUsers: []
};

export const defaultOrders: DataOrders = {
  orders: []
};
