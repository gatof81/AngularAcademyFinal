import { createSelector } from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { compose } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/data';

import * as fromData from './user';

export interface State {
  data: dataModel.Data;
}

export const reducers: ActionReducerMap<State> = {
  data: fromData.reducer,
};

export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['ui'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];

/* Data */

export const getDataState = (state: State) => state.data

export const getUser = createSelector(getDataState, fromData.getUser);
export const getProducts = createSelector(getDataState, fromData.getProducts);

