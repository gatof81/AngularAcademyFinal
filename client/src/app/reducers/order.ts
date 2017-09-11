import * as dataModel from '../models/data';
import * as data from '../actions/order';
import { merge, filter, clone, find } from 'lodash';

export function reducer(state = dataModel.defaultOrders, action: data.Actions): dataModel.DataOrders {
  switch (action.type) {
    case data.ActionTypes.CREATE_SUCCESS:
      return merge({}, state, {orders: [...state.orders, action.payload]});
    case data.ActionTypes.GET_ORDERS_FROM_USER_SUCCESS:
      return merge({}, {orders: action.payload});
    default:
      return state;
  }
}

export const getOrders = (state: dataModel.DataOrders) => state.orders;
