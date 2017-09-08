
import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/products';
import { merge, filter, clone, find } from 'lodash';


export function reducer(state = dataModel.defaultsProducts, action: data.Actions): dataModel.DataProducts {
  let stateCopy = clone(state);
  switch (action.type) {
    case data.ActionTypes.PRODUCTS_SUCCESS:
      return merge({}, state, {products: action.payload});
    case data.ActionTypes.SERVER_CREATE_SUCCESSFUL:
      return merge({}, state, {products: [...state.products, action.payload]});
    case data.ActionTypes.SERVER_DELETE_SUCCESSFUL:
      stateCopy.products = filter(state.products, prod => {
        return prod._id !== action.payload._id
      });
      return merge({}, stateCopy);
    case data.ActionTypes.SERVER_UPDATE_SUCCESSFUL:
      stateCopy.products = filter(state.products, prod => {
        return prod._id !== action.payload._id
      });
      stateCopy.products.push(action.payload);
      return merge({}, stateCopy);
    default:
      return state;
  }
}

export const getProducts = (state: dataModel.DataProducts) => state.products;
