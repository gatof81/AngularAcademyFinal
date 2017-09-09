import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top">
      <a class="navbar-brand" uiSref="products">Academy-E</a>
      <a class="nav-link" *ngIf="user.token" uiSref="login">Login</a>
      <a class="nav-link" *ngIf="!user.token" uiSref="login">Logout</a>
      <a class="nav-link" uiSref="products">store</a>
      <a class="nav-link" uiSref="admin"><i>cart </i> <span *ngIf="inCart.length">({{inCart.length}})</span></a>
      <a *ngIf="admin" class="nav-link" uiSref="admin">Admin</a>
    </nav>
  `,
  styles: []
})
export class NavBarComponent implements OnInit {
  private admin = false;
  private manager = false;
  public user;
  public inCart;


  constructor(private store: Store<fromRoot.State>) {

  }

  ngOnInit() {
    this.user = this.store.select(fromRoot.getUser).subscribe(user => {
      if(user.token) {
        this.admin = user.role === 2;
        this.manager = user.role === 1;
      }
    });
    this.inCart = this.store.select(fromRoot.getProducts).subscribe(products => {
      this.inCart = products.filter(product => {
        return product.inCart === true;
      })
    });
  }

}
