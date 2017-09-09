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
    .map((action: data.LoginAction) => action.payload)
    .switchMap(payload => this.dataService.login(payload)
      .map(res => new data.LoginSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  @Effect()
  register$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_REGISTER_USER)
    .map((action: data.RegisterUserAction) => action.payload)
    .switchMap(payload => this.dataService.register(payload)
      .map( res => new data.RegisterUserSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err))));

  constructor(private actions$: Actions, private dataService: DataService, private toasterService: ToasterService) {
  }
}
