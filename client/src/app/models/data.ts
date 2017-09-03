import { User } from './user';
import {Product} from './product';

export interface Data {
  user: User,
  products: Array<Product>
}

export const defaults: Data = {
  user: {},
  products:[]
};
