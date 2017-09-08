import { User } from './user';
import {Product} from './product';

export interface DataUser {
  user: User
}

export interface DataProducts {
  products: Array<Product>
}

export const defaultsUser: DataUser = {
  user: {}
};

export const defaultsProducts: DataProducts = {
  products:[]
};
