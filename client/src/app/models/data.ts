import { User } from './user';
import {Product} from './product';

export interface DataUser {
  user: User
}

export interface DataProducts {
  products: Array<Product>
}

export interface DataAllUsers {
  allUsers: Array<User>
}

export const defaultsUser: DataUser = {
  user: {}
};

export const defaultsProducts: DataProducts = {
  products:[]
};

export const defaultsAllUsers: DataAllUsers = {
  allUsers:[]
};
