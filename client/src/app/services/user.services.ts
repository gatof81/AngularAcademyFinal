import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/user';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
  }

  dispatchLoad() {
    this.store.dispatch(new data.LoginAction({}));
  }

  register(payload) {
    return this.http.post(`http://localhost:8000/api/user`, {username: trim(payload.username), password: trim(payload.password)});
  }

  login(payload) {
    return this.http.post(`http://localhost:8000/api/login`, {username: trim(payload.username), password: trim(payload.password)});
  }

  remove(payload) {
    return this.http.delete(`http://localhost:8000/api/deleteUser/${payload.user._id}`,{
        headers: new HttpHeaders().set('x-access-token', payload.token)
      });
  }

  update(payload) {
    return this.http.put(`http://localhost:8000/api/updateUser`, payload.user,{
      headers: new HttpHeaders().set('x-access-token', payload.token),
    })
  }

  getUsers(payload) {
    return this.http.get(`http://localhost:8000/api/allUsers/${payload.token}`);
  }
}
