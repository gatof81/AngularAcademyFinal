
import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/user';
import * as products from '../actions/products';
import { merge, without, clone, find } from 'lodash';


export function reducer(state = dataModel.defaultsUser, action: data.Actions): dataModel.DataUser {
  switch (action.type) {
    case data.ActionTypes.LOGIN_SUCCESS:
      return merge({}, state, {user: action.payload});
    case data.ActionTypes.SERVER_REGISTER_SUCCESS:
      return merge({}, state, {user: action.payload});
    default:
      return state;
  }
}

export const getUser = (state: dataModel.DataUser) => state.user;
