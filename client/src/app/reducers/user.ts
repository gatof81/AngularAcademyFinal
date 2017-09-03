
import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/user';
import * as products from '../actions/products';
import { merge, without, clone, find } from 'lodash';


export function reducer(state = dataModel.defaults, action: data.Actions): dataModel.Data {
  switch (action.type) {
    case data.ActionTypes.LOGIN_SUCCESS:
      return merge({}, state, {user: action.payload});
    case  products.ActionTypes.PRODUCTS_SUCCESS:
      return merge({}, state, {products: action.payload});
    default:
      return state;
  }
}

export const getUser = (state: dataModel.Data) => state.user;
export const getProducts = (state: dataModel.Data) => state.products;
