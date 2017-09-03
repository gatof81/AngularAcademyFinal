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
export class DataEffects {

  @Effect()
  login$: Observable<Action> = this.actions$.ofType(data.ActionTypes.PRODUCTS)
    .debounceTime(300)
    .map((action: data.GetProductsAction) => action.payload)
    .switchMap(payload => this.dataService.getProducts(payload)
      .map(res => new data.GetProductsSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  constructor(private actions$: Actions, private dataService: ProductsService, private toasterService: ToasterService) {
  }
}
