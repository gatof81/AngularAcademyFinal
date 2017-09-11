import * as dataModel from '../models/data';
import * as data from '../actions/order';
import { merge, filter, clone, find } from 'lodash';

export function reducer(state = dataModel.defaultOrders, action: data.Actions): dataModel.DataOrders {
  let stateCopy = clone(state);
  switch (action.type) {
    case data.ActionTypes.CREATE_SUCCESS:
      return merge({}, state, {orders: [...state.orders, action.payload]});
    case data.ActionTypes.GET_ORDERS_FROM_USER_SUCCESS:
      return merge({}, {orders: action.payload});
    case data.ActionTypes.DELETE_ORDER_SUCCESS:
      stateCopy.orders = filter(state.orders, order => {
        return order._id !== action.payload._id
      });
      return merge({}, stateCopy);
    case data.ActionTypes.CHANGE_ORDER_STATUS:
      stateCopy.orders = filter(state.orders, order => {
        return order._id !== action.payload._id
      });
      stateCopy.orders.push(action.payload);
      return merge({}, stateCopy);
    default:
      return state;
  }
}

export const getOrders = (state: dataModel.DataOrders) => state.orders;
