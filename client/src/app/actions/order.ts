import { Action } from '@ngrx/store';
import { type } from '../utils';

export const ActionTypes = {
  CREATE: type('[Data] Create Order'),
  CREATE_SUCCESS: type('[Data] Create Order Success'),
  SERVER_FAIL: type('[Data] Server Failure Orders'),
  GET_ORDERS_FROM_USER: type('[Data] Get Orders'),
  GET_ORDERS_FROM_USER_SUCCESS: type('[Data] Get Orders Success'),
  DELETE_ORDER: type('[Data] Delete Order'),
  DELETE_ORDER_SUCCESS: type('[Data] Delete Order Success'),
  CHANGE_ORDER_STATUS: type('[Data] Change Order Status'),
  CHANGE_ORDER_STATUS_SUCCESS: type('[Data] Change Order Status Success')
};


export class CreateOrderAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: any) { }
}

export class CreateOrderActionSuccess implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export class GetOrdersAction implements Action {
  readonly type = ActionTypes.GET_ORDERS_FROM_USER;
  constructor(public payload: any) { }
}

export class GetOrdersActionSuccess implements Action {
  readonly type = ActionTypes.GET_ORDERS_FROM_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteOrderAction implements Action {
  readonly type = ActionTypes.DELETE_ORDER;
  constructor(public payload: any) { }
}

export class DeleteOrderActionSuccess implements Action {
  readonly type = ActionTypes.DELETE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ChangeOrderAction implements Action {
  readonly type = ActionTypes.CHANGE_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class ChangeOrderActionSuccess implements Action {
  readonly type = ActionTypes.CHANGE_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export type Actions
  = CreateOrderAction
  | CreateOrderActionSuccess
  | ServerFailAction
  | GetOrdersAction
  | GetOrdersActionSuccess
  | DeleteOrderAction
  | DeleteOrderActionSuccess
  | ChangeOrderAction
  | ChangeOrderActionSuccess
