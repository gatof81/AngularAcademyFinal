import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/user';
import { StateService } from '@uirouter/angular';


@Component({
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar navbar-toggleable-sm navbar-inverse fixed-top">
        <a class="navbar-brand" uiSref="products">Academy-E</a>
        <a class="nav-link" uiSref="products">store</a>
        <a class="nav-link" uiSref="products"><i>cart </i> <span *ngIf="inCart.length">({{inCart.length}})</span></a>
        <a *ngIf="admin || manager" class="nav-link" uiSref="admin.user">Admin Users</a>
        <a *ngIf="admin" class="nav-link" uiSref="admin.products">Admin Products</a>
        <a class="nav-item login-link" *ngIf="!logged" uiSref="login.register-input">Register</a>
        <a class="nav-item login-link A" *ngIf="!logged" uiSref="login.login-input">Login /</a>
        <a class="nav-item login-link" *ngIf="logged" (click)="logout()">Logout</a>
    </nav>
  `,
  styles: [`
    .login-link{
      position: absolute;
      right: 10px;
    }
    .login-link.A{
      right: 80px;
    }
  `]
})
export class NavBarComponent implements OnInit {
  public admin = false;
  public manager = false;
  public user;
  public inCart;
  public logged;

  constructor(private store: Store<fromRoot.State>, private stateService: StateService) {

  }

  ngOnInit() {
    this.user = this.store.select(fromRoot.getUser).subscribe(user => {
      if(user.token) {
        this.admin = user.userRole === 2;
        this.manager = user.userRole === 1;
        this.logged = true;
      } else {
        this.admin = false;
        this.manager = false;
        this.logged = false;
      }
    });
    this.inCart = this.store.select(fromRoot.getProducts).subscribe(products => {
      this.inCart = products.filter(product => {
        return product.inCart === true;
      })
    });
  }

  logout(){

    this.stateService.go('login.login-input');
    this.store.dispatch(new data.LogoutAction({}));
  }

}
