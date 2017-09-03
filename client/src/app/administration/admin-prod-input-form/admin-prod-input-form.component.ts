import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-admin-prod-input-form',
  template: `
    <div class="form-group">
      <div class="form-control">
        <input placeholder="Product name" class="form-control" name="name" [formControl]="loginForm.controls['name']">
      </div>
      <div class="form-control">
        <input placeholder="Product description" class="form-control" name="desc" [formControl]="loginForm.controls['desc']">
      </div>
      <div class="form-control">
        <input placeholder="Product price" class="form-control" name="price" [formControl]="loginForm.controls['price']">
      </div>
      <div class="form-control">
        <input type="image" placeholder="image" class="form-control" name="image" [formControl]="loginForm.controls['image']">
      </div>
      <button [disabled]="!isValid()" (click)="login()">create product</button>
    </div>
  `,
  styles: []
})
export class AdminProdInputFormComponent implements OnInit {
  @Output() onLogin = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
