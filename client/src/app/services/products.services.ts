import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/products';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
  }

  dispatchLoad() {
    this.store.dispatch(new data.GetProductsAction({}));
  }

  addProduct(payload) {
    return this.http.post(`http://localhost:8000/api/products`, {
      prod_name: trim(payload.user.prod_name),
      description: trim(payload.user.description),
      price: trim(payload.user.price)
    }, {
      headers: new HttpHeaders().set('x-access-token', payload.token),
    });
  }

  getProducts() {
    return this.http.get(`http://localhost:8000/api/getAllProducts/`);
  }

  remove(payload) {
    return this.http.delete(`http://localhost:8000/api/deleteProduct/${payload._id}`,{
      headers: new HttpHeaders().set('x-access-token', payload.user.token)
    })
  }

  update(payload) {
    return this.http.put(`http://localhost:8000/api/updateProduct/`, payload.product,{
      headers: new HttpHeaders().set('x-access-token', payload.user.token),
    })
  }
}
