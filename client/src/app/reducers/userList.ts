
import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/user';
import * as products from '../actions/products';
import { merge, without, clone, filter } from 'lodash';


export function reducer(state = dataModel.defaultsAllUsers, action: data.Actions): dataModel.DataAllUsers {
  let stateCopy = clone(state);

  switch (action.type) {
    case data.ActionTypes.USERS_SUCCESS:
      return merge({}, state, {allUsers: action.payload});
    case data.ActionTypes.UPDATE_SUCCESS:
      stateCopy.allUsers = filter(state.allUsers, user => {
        return user._id !== action.payload._id
      });
      stateCopy.allUsers.push(action.payload);
      return merge({}, stateCopy);
    case data.ActionTypes.USER_DELETE_SUCCESS:
      stateCopy.allUsers = filter(state.allUsers, user => {
        return user._id !== action.payload._id
      });
      return merge({}, stateCopy);
    default:
      return state;
  }
}

export const getAllUsers = (state: dataModel.DataAllUsers) => state.allUsers;
