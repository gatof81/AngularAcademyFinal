import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/products';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {clone} from 'lodash';

@Component({
  selector: 'app-product-list',
  template: `    
    <div class="container-fluid text-center pb-5">
      <div class="row">
        <app-admin-prod-input-form></app-admin-prod-input-form>
      </div>
      <div class="row">
        <app-admin-prod-item-card *ngFor="let product of getProducts() | async" 
                                  (onEdit)="editProduct($event)"
                                  (onDelete)="deleteProduct($event)">
        </app-admin-prod-item-card>
      </div>
    </div>
  `,
  styles: []
})
export class AdminProdListComponent implements OnInit, OnDestroy {
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

  editProduct(product) {
    this.store.dispatch(new data.GetProductsAction(product));
  }

  deleteProduct(product) {
    this.store.dispatch(new data.GetProductsAction(product));
  }
}

