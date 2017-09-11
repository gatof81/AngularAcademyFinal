import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/products';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-order-cart-list',
  template: `
    <div class="container-fluid text-center pb-5">
      <div>Checkout order</div>
      <div class="row">
        <table class="table table-stripped">
          <thead class="thead-inverse">
          <tr>
            <th class="text-center">Product Name</th>
            <th class="text-center">Price</th>
            <th class="text-center">quantity</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr app-order-cart-item *ngFor="let product of getProducts() | async" [product]="product" (quantity)="quantity($event)"></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class OrderCartListComponent implements OnInit, OnDestroy {
  private alive:boolean = true;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new data.GetProductsAction({}));
  }

  ngOnInit() {
  }

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((cardArr) => cardArr.filter(prod => prod.inCart === true ));
  }

  ngOnDestroy() {
    this.alive = false;
  }

  quantity(number){
    console.log()
  }

}
