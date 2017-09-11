import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as data from '../actions/order';
import {OrderServices} from '../services/order.services';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular2-toaster';
import 'rxjs/add/operator/map'

@Injectable()
export class DataEffectsOrders {

  @Effect()
  load$: Observable<Action> = this.actions$.ofType(data.ActionTypes.GET_ORDERS_FROM_USER)
    .map((action: data.GetOrdersAction) => action.payload)
    .switchMap(payload => this.dataService.getOrders(payload)
      .map(res => new data.GetOrdersActionSuccess(res))
      .catch(err => of(new data.ServerFailAction(err))));

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(data.ActionTypes.CREATE)
    .map((action: data.CreateOrderAction) => action.payload)
    .switchMap(payload => this.dataService.addOrder(payload)
      .map(res => new data.CreateOrderActionSuccess(res))
      .catch(err => of(new data.ServerFailAction(err))));

  constructor(private actions$: Actions, private dataService: OrderServices, private toasterService: ToasterService) {
  }
}
