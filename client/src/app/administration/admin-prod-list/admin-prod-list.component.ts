import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/products';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Product} from '../../models/product';
import {User} from '../../models/user';

@Component({
  selector: 'app-admin-product-list',
  template: `
    <app-admin-prod-edit 
      [editingProduct]="editingProduct"
      [visible]="visible"
      (onCancel)="editProduct($event)"
      (onUpdate)="updateProduct($event)"
    ></app-admin-prod-edit>
    <div class="row text-center">
      <table class="table table-stripped">
        <thead class="thead-inverse">
        <tr>
          <th class="text-center">Product Name</th>
          <th class="text-center">Description</th>
          <th class="text-center">Price</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" app-admin-prod-item *ngFor="let product of getProductsPaged() | async"
                             [product]="product"
                             [user]="user"
                             (onEdit)="editProduct($event)"
                             (onRemove)="deleteProduct($event)">
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class AdminProdListComponent implements OnInit, OnDestroy {
  private alive = true;
  page:number = 0;
  private pageLength = 10
  public visible = false;
  public editingProduct:Product;
  private user:User;

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getUser)
      .takeWhile(() => this.alive).subscribe(user => {
      if(user.token) console.log(user.token)
      //this.stateService.go('products');
      this.user = user;
    });
    this.store.dispatch(new data.GetProductsAction({}));
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

  updateProduct(product){
    let payload = {
      product: product,
      user: this.user
    }
    this.store.dispatch(new data.UpdateProductAction(payload));
  }

  getProductsPaged() {
    return this.getProducts().map((prod) => prod.slice(this.pageLength * this.page, this.pageLength))
  }

  editProduct(product) {
    this.visible = !this.visible;
    this.editingProduct = product;
  }

  deleteProduct(product) {
    let payload = {
      product: product,
      user: this.user.token
    }
    this.store.dispatch(new data.DeleteProductAction(payload));
  }
}

