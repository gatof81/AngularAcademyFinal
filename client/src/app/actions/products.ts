import { Action } from '@ngrx/store';
import { type } from '../utils';

export const ActionTypes = {
  PRODUCTS: type('[Data] Get Products'),
  PRODUCTS_SUCCESS: type('[Data] Get Products Success'),
  SERVER_FAIL: type('[Data] Server FAilure')
};

export class GetProductsAction implements Action {
  readonly type = ActionTypes.PRODUCTS;
  constructor(public payload: any) { }
}

export class GetProductsSuccessAction implements Action {
  readonly type = ActionTypes.PRODUCTS_SUCCESS;

  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = GetProductsAction
  | GetProductsSuccessAction
  | ServerFailAction
