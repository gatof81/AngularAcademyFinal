import { createSelector } from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { compose } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/data';

import * as fromDataUser from './user';
import * as fromDataProduct from './products';

export interface State {
  dataUser: dataModel.DataUser,
  dataProduct: dataModel.DataProducts
}

export const reducers: ActionReducerMap<State> = {
  dataUser: fromDataUser.reducer,
  dataProduct: fromDataProduct.reducer
};

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

export const getDataStateUser = (state: State) => state.dataUser
export const getDataStateProducts = (state: State) => state.dataProduct


export const getUser = createSelector(getDataStateUser, fromDataUser.getUser);

export const getProducts = createSelector(getDataStateProducts, fromDataProduct.getProducts);

