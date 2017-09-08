import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/products';
import {HttpObserve} from '@angular/common/http/src/client';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }

  dispatchLoad() {
    this.store.dispatch(new data.GetProductsAction({}));
  }

  addProduct(payload) {
    return this.http.post(`http://localhost:8000/api/products`, {
      prod_name: trim(payload.prod_name),
      description: trim(payload.description),
      price: trim(payload.price)
    }, {
      headers: new HttpHeaders().set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpZWdvZjE4QGhvdG1haWwuY29tIiwiaWQiOjAsImlhdCI6MTUwNDQ5NTQyOH0.oOoLYh9Ih9hBYg8FemdtnDT1tFjIsP72KYELYpBJ3N0'),
    });
  }

  getProducts() {
    return this.http.get(`http://localhost:8000/api/getAllProducts/`);
  }

  remove(payload) {
    return this.http.delete(`http://localhost:8000/api/deleteProduct/${payload._id}`,{
      headers: new HttpHeaders().set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpZWdvZjE4QGhvdG1haWwuY29tIiwiaWQiOjAsImlhdCI6MTUwNDQ5NTQyOH0.oOoLYh9Ih9hBYg8FemdtnDT1tFjIsP72KYELYpBJ3N0')
    })
  }

  update(payload) {
    return this.http.put(`http://localhost:8000/api/updateProduct/`, payload,{
      headers: new HttpHeaders().set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpZWdvZjE4QGhvdG1haWwuY29tIiwiaWQiOjAsImlhdCI6MTUwNDQ5NTQyOH0.oOoLYh9Ih9hBYg8FemdtnDT1tFjIsP72KYELYpBJ3N0'),
    })
  }

  refreshToken() {
    return this.http.get(`/api/xsrf.json`);
  }
}
