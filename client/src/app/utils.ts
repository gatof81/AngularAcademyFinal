import {Store} from '@ngrx/store';
import * as fromRoot from './reducers'
import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from 'rxjs/Observable';
const typeCache: {[label: string]: boolean} = {};


//const store = new Store(fromRoot.State);

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type ${label} is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
};

export function requireAdmin(transition) {
  let $state = transition.router.stateService;
  //TODO
  //get app state
  return $state.target('login');

};
export function requireLogged(transition) {
  let $state = transition.router.stateService;
  //TODO
  //get app state
  return $state.target('login');
};

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>, private router: Router){

  }

  waitForUserToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getUser)
  }


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForUserToLoad()
     // .switchMap( () => {});
  }


}


