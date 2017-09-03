import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/user';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }

  dispatchLoad() {
    this.store.dispatch(new data.LoginAction({}));
  }

  register(payload) {
    return this.http.post(`/api/cards.json`, {text: trim(payload)});
  }

  login(payload) {
    return this.http.post(`http://localhost:8000/api/login`, {username: payload.username, password: payload.password});
  }

  remove(payload) {
    return this.http.delete(`/api/cards/${payload.id}.json`);
  }

  update(payload) {
    return this.http.patch(`/api/cards/${payload.id}.json`, payload);
  }

  refreshToken() {
    return this.http.get(`/api/xsrf.json`);
  }
}
