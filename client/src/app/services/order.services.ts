import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/order';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class OrderServices {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
  }

  dispatchLoad() {
    this.store.dispatch(new data.GetOrdersAction({}));
  }

  addOrder(payload) {
    return this.http.post(`http://localhost:8000/api/order`, payload.order, {
      headers: new HttpHeaders().set('x-access-token', payload.token),
    });
  }

  getOrders(payload) {
    return this.http.get(`http://localhost:8000/api/getAllOrdersFrom/${payload.token}`);
  }

  deleteOrder(payload) {
    return this.http.delete(`http://localhost:8000/api/deleteOrder/${payload.order._id}`,{
      headers: new HttpHeaders().set('x-access-token', payload.token)
    })
  }

  changeOrder(payload){
    return this.http.put(`http://localhost:8000/api/updateOrder/`, payload.order,{
      headers: new HttpHeaders().set('x-access-token', payload.token),
    })
  }

}
