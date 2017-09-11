import { createSelector } from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { compose } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/data';

import * as fromDataUser from './user';
import * as fromDataProduct from './products';
import * as fromDataAllUsers from './userList';
import * as fromDataOrders from './order';

export interface State {
  dataUser: dataModel.DataUser,
  dataProduct: dataModel.DataProducts,
  dataAllUsers: dataModel.DataAllUsers,
  dataOrders: dataModel.DataOrders
}

export const reducers: ActionReducerMap<State> = {
  dataUser: fromDataUser.reducer,
  dataProduct: fromDataProduct.reducer,
  dataAllUsers: fromDataAllUsers.reducer,
  dataOrders: fromDataOrders.reducer
}

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['dataUser'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];

/* Data */

export const getDataStateUser = (state: State) => state.dataUser;
export const getDataStateProducts = (state: State) => state.dataProduct;
export const getDataStateAllUsers = (state: State) => state.dataAllUsers;
export const getDataStateOrder = (state: State) => state.dataOrders;


export const getUser = createSelector(getDataStateUser, fromDataUser.getUser);

export const getProducts = createSelector(getDataStateProducts, fromDataProduct.getProducts);

export const getAllUsers = createSelector(getDataStateAllUsers, fromDataAllUsers.getAllUsers);

export const getOrders = createSelector(getDataStateOrder, fromDataOrders.getOrders);

