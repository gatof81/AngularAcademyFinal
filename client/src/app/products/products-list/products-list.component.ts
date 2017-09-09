import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/products';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {clone} from 'lodash';

@Component({
  selector: 'app-product-list',
  template: `    
    <div class="container-fluid text-center pb-5">
      <div class="row">
        <app-products-card *ngFor="let product of getProducts() | async" [product]="product" (onBuy)="addToCart($event)"></app-products-card>
      </div>
    </div>
  `,
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new data.GetProductsAction({}));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getProducts(inCart = false) {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

  addToCart(product) {
    let clonned = clone(product);
    clonned.pinned = !clonned.inCart;
    this.store.dispatch(new data.ToggleCartAction(clonned));
  }
}
