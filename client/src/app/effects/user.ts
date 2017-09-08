import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as data from '../actions/user';
import {DataService} from '../services/user.services';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular2-toaster';
import 'rxjs/add/operator/map'
import { mapKeys, keys, isObject } from 'lodash';

@Injectable()
export class DataEffectsUsers {

  @Effect()
  login$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOGIN)
    .debounceTime(300)
    .map((action: data.LoginAction) => action.payload)
    .switchMap(payload => this.dataService.login(payload)
      .map(res => new data.LoginSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  // @Effect()
  // add$: Observable<Action> = this.actions$.ofType(data.ActionTypes.ADD)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.add(payload)
  //     .map(res => new data.ServerAddSuccessAction(res))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );
  //
  // @Effect({dispatch: false})
  // addFail$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_FAIL)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => {
  //     this.toasterService.pop('error', 'Failure',
  //       isObject(payload.error) ? keys(
  //         mapKeys(payload.error, (value: Array<string>, key: string) => `${key}: ${value.join(';')}`)).join(';') :
  //         payload.error);
  //     return of(null);
  //   });
  //
  // @Effect()
  // remove$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REMOVE)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.remove(payload)
  //     .map(res => new data.RemoveSuccessAction(payload))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );
  //
  // @Effect()
  // update$: Observable<Action> = this.actions$.ofType(data.ActionTypes.UPDATE)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.update(payload)
  //     .map(res => new data.UpdateSuccessAction(res))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );
  //
  // @Effect({dispatch: false})
  // refreshToken$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REFRESH_TOKEN)
  //   .debounceTime(300)
  //   .switchMap(() => this.dataService.refreshToken().map(() => null));


  constructor(private actions$: Actions, private dataService: DataService, private toasterService: ToasterService) {
  }
}
