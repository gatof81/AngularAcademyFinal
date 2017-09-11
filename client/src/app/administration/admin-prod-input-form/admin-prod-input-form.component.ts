import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { StateService } from '@uirouter/angular';
import * as data from '../../actions/products';
import {User} from '../../models/user';


@Component({
  selector: 'app-admin-prod-input-form',
  template: `
    <div *ngIf="visible">
      <div class="backdrop" (click)="toggleVisible()"></div>
      <div class="modal-visible">
        <div class="form-group">
          <div class="form-control input-space">
            <input placeholder="Product name" class="form-control" name="name" [formControl]="productForm.controls['name']">
          </div>
          <div class="form-control input-space">
            <input placeholder="Product description" class="form-control" name="desc" [formControl]="productForm.controls['desc']">
          </div>
          <div class="form-control input-space">
            <input type="number" placeholder="Product price" class="form-control" name="price" [formControl]="productForm.controls['price']">
          </div>
          <button [disabled]="!isValid()" (click)="create()">Create product</button>
          <button (click)="toggleVisible()">Cancel</button>
        </div>
      </div>
    </div>
    <button (click)="toggleVisible()">Create</button>
  `,
  styles: []
})
export class AdminProdInputFormComponent implements OnInit, OnDestroy {
  @Output() onLogin = new EventEmitter<string>();
  private alive = true;
  productForm: FormGroup;
  public visible = false;
  private user:User;

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, public stateService: StateService) {
    this.productForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'desc': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'price': [null, Validators.compose([Validators.required, Validators.min(0)])]
    });
    this.store.select(fromRoot.getUser)
      .takeWhile(() => this.alive).subscribe(user => {
      if(user.token) console.log(user.token)
        //this.stateService.go('products');
        this.user = user;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.alive = false;
  }

  isValid() {
    return this.productForm.valid;
  }

  toggleVisible(){
    this.visible = !this.visible;
  }

  create() {
    this.store.dispatch(new data.CreateProductAction({
      user:{
        prod_name: this.productForm.controls['name'].value,
        description: this.productForm.controls['desc'].value,
        price: this.productForm.controls['price'].value,
      },
      token: this.user.token
    }));
    this.productForm.reset();
    this.toggleVisible();
  }
}
