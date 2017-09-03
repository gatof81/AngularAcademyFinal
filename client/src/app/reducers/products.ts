
import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/products';
import { merge, without, clone, find } from 'lodash';


export function reducer(state = dataModel.defaults, action: data.Actions): dataModel.Data {
  switch (action.type) {
    case data.ActionTypes.PRODUCTS_SUCCESS:
      return merge({}, state, {user: action.payload});
    default:
      return state;
  }
}

export const getProducts = (state: dataModel.Data) => state.products;
