import { Action } from '@ngrx/store';
import { type } from '../utils';
import { User} from '../models/user';

export const ActionTypes = {
  LOGIN: type('[Data] Login User'),
  LOGIN_SUCCESS: type('[Data] Load Cards Success'),
  UPDATE: type('[Data] Update Card'),
  UPDATE_SUCCESS: type('[Data] Server Update Success'),
  SERVER_ADD_SUCCESS: type('[Data] Server Add Card Successful'),
  SERVER_FAIL: type('[Data] Server Failure'),
  REFRESH_TOKEN: type('[Data] Refresh Token'),
  REFRESH_TOKEN_SUCCESS: type('[Data] Refresh Token Success'),
  REFRESH_TOKEN_FAIL: type('[Data] Refresh Token Fail'),
};

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: any) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any) { }
}

export class RefreshTokenAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN;

  constructor(public payload: any) { }
}

export class RefreshTokenSuccessAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN_SUCCESS;

  constructor(public payload: any) { }
}

export class RefreshTokenFailAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN_FAIL;

  constructor(public payload: any) { }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | UpdateAction
  | UpdateSuccessAction
  | ServerFailAction
  | RefreshTokenAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailAction;
