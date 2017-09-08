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
        <app-products-card *ngFor="let product of getProducts() | async"></app-products-card>
      </div>
    </div>
  `,
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public inCart: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.inCart = this.getProducts().takeWhile(() => this.alive).map((products) => products.length > 0);
    console.log(this.inCart)
    this.store.dispatch(new data.GetProductsAction({}));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getProducts(inCart = false) {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((prodArr) => prodArr.filter(prod => inCart ? prod.inCart === true : prod.inCart  !== true));
  }

  buyProduct(product) {
    this.store.dispatch(new data.GetProductsAction(product));
  }
}
