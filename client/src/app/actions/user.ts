import { Action } from '@ngrx/store';
import { type } from '../utils';
import { User} from '../models/user';

export const ActionTypes = {
  LOGIN: type('[Data] Login User'),
  LOGIN_SUCCESS: type('[Data] Load User Success'),
  UPDATE: type('[Data] Update User'),
  UPDATE_SUCCESS: type('[Data] Server Update Success'),
  SERVER_REGISTER_USER: type('[Data] Server Register User'),
  SERVER_REGISTER_SUCCESS: type('[Data] Server Register User Successful'),
  SERVER_FAIL: type('[Data] Server Failure')
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

export class RegisterUserAction implements Action {
  readonly type = ActionTypes.SERVER_REGISTER_USER;

  constructor(public payload: any) { }
}

export class RegisterUserSuccessAction implements Action {
  readonly type = ActionTypes.SERVER_REGISTER_SUCCESS;

  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = LoginAction
  | LoginSuccessAction
  | UpdateAction
  | UpdateSuccessAction
  | ServerFailAction
  | RegisterUserAction
  | RegisterUserSuccessAction
