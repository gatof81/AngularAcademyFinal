import { Action } from '@ngrx/store';
import { type } from '../utils';
import {Product} from '../models/product';

export const ActionTypes = {
  PRODUCTS: type('[Data] Get Products'),
  PRODUCTS_SUCCESS: type('[Data] Get Products Success'),
  SERVER_FAIL: type('[Data] Server Failure Products'),
  CREATE_PRODUCT: type('[Data] Create Product'),
  SERVER_CREATE_SUCCESSFUL: type('[Data] Create product Success'),
  SERVER_DELETE_PRODUCT: type('[Data] Delete product'),
  SERVER_DELETE_SUCCESSFUL: type('[Data] Delete product Success'),
  SERVER_UPDATE_PRODUCT: type('[Data] Update product'),
  SERVER_UPDATE_SUCCESSFUL: type('[Data] Update product Success'),
  TOGGLE_CART: type('[Data] Toggle cart')
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

export class CreateProductAction implements Action {
  readonly type = ActionTypes.CREATE_PRODUCT;

  constructor(public payload: any) { }
}

export class CreateProductSuccessAction implements Action {
  readonly type = ActionTypes.SERVER_CREATE_SUCCESSFUL;

  constructor(public payload: any) { }
}

export class DeleteProductAction implements Action {
  readonly type = ActionTypes.SERVER_DELETE_PRODUCT;

  constructor(public payload: any) { }
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ActionTypes.SERVER_DELETE_SUCCESSFUL;

  constructor(public payload: any) { }
}

export class UpdateProductAction implements Action {
  readonly type = ActionTypes.SERVER_UPDATE_PRODUCT;

  constructor(public payload: any) { }
}

export class UpdateProductSuccessAction implements Action {
  readonly type = ActionTypes.SERVER_UPDATE_SUCCESSFUL;

  constructor(public payload: any) { }
}

export class ToggleCartAction implements Action {
  readonly type = ActionTypes.TOGGLE_CART;

  constructor(public payload: Product) { }
}

export type Actions
  = GetProductsAction
  | GetProductsSuccessAction
  | ServerFailAction
  | CreateProductAction
  | CreateProductSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | UpdateProductAction
  | UpdateProductSuccessAction
  | ToggleCartAction
