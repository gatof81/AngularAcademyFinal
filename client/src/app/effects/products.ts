import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as data from '../actions/products';
import {ProductsService} from '../services/products.services';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular2-toaster';
import 'rxjs/add/operator/map'
import { mapKeys, keys, isObject } from 'lodash';

@Injectable()
export class DataEffectsProducts {

  @Effect()
  load$: Observable<Action> = this.actions$.ofType(data.ActionTypes.PRODUCTS)
    .debounceTime(300)
    .map((action: data.GetProductsAction) => action.payload)
    .switchMap(payload => this.dataService.getProducts()
      .map(res => new data.GetProductsSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  @Effect()
  add$: Observable<Action> = this.actions$.ofType(data.ActionTypes.CREATE_PRODUCT)
    .debounceTime(300)
    .map((action: data.CreateProductAction) => action.payload)
    .switchMap(payload => this.dataService.addProduct(payload)
      .map(res => new data.CreateProductSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  @Effect()
  remove$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_DELETE_PRODUCT)
    .debounceTime(300)
    .map((action: data.DeleteProductAction) => action.payload)
    .switchMap(payload => this.dataService.remove(payload)
      .map(res => new data.DeleteProductSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_UPDATE_PRODUCT)
    .debounceTime(300)
    .map((action: data.UpdateProductAction) => action.payload)
    .switchMap(payload => this.dataService.update(payload)
      .map(res => new data.UpdateProductSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  constructor(private actions$: Actions, private dataService: ProductsService, private toasterService: ToasterService) {
  }
}
