import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { PRODUCTS_STATES } from './products.states';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProductsComponent} from './products.component';
import {ProductsCardComponent} from './products-card/products-card.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {OrderCartItemComponent} from './order-cart-item/order-cart-item.component';
import {OrderMyOrdersComponent} from './order-my-orders/order-my-orders.component';

const PRODUCTS_COMPONENTS =  [
  ProductsComponent,
  ProductsCardComponent,
  ProductsListComponent,
  OrderCartItemComponent,
  OrderCartItemComponent,
  OrderMyOrdersComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forChild({
      states: PRODUCTS_STATES,
    }),

  ],
  declarations: PRODUCTS_COMPONENTS
})
export class ProductsModule { }
