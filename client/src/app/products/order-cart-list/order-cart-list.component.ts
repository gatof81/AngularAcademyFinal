import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/products';
import * as dataOrder from '../../actions/order';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-order-cart-list',
  template: `
    <div class="container-fluid text-center pb-5" >
      <div *ngIf="inCart.length">
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
            <tr app-order-cart-item *ngFor="let product of getProducts() | async" [product]="product" (onQuantity)="quantity($event)"></tr>
            </tbody>
          </table>
          <button (click)="checkOut()">Checkout</button>
        </div>
      </div>
      <div><div>My Orders</div>
        <div class="row">
          <table class="table table-stripped">
            <thead class="thead-inverse">
            <tr>
              <th class="text-center">Order ID</th>
              <th class="text-center">Producst</th>
              <th class="text-center">Status</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr app-order-item *ngFor="let order of getOrders() | async" [order]="order"></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class OrderCartListComponent implements OnInit, OnDestroy {
  private alive:boolean = true;
  public inCart;
  private user;

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new data.GetProductsAction({}));

    this.inCart = this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .subscribe(products => {
      this.inCart = products.filter(product => {
        return product.inCart === true;
      })
    })

    this.store.select(fromRoot.getUser)
      .takeWhile(() => this.alive).subscribe(user => {
      if(user.token) console.log(user.token)
      this.user = user;
      this.store.dispatch(new dataOrder.GetOrdersAction(this.user));
    })
  }

  ngOnInit() {
  }

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((prodArr) => prodArr.filter(prod => prod.inCart === true ));
  }

  getOrders(){
    if(this.user.token){
      return this.store.select(fromRoot.getOrders)
        .takeWhile(() => this.alive)
    }else{
      return [];
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  quantity(number){
    console.log(number)
  }

  checkOut(){
    this.store.dispatch(new dataOrder.CreateOrderAction({
      order:{
        status:false,
        products:this.inCart,
        owner:this.user._id
      },
      token: this.user.token
    }));
  }

}
