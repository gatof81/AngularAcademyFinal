import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { PRODUCTS_STATES } from './products.states';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProductsComponent} from './products.component';
import {ProductsCardComponent} from './products-card/products-card.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {OrderCartItemComponent} from './order-cart-item/order-cart-item.component';
import {OrderCartListComponent} from './order-cart-list/order-cart-list.component';
import {OrderMyOrdersComponent} from './order-my-orders/order-my-orders.component';
import { NumberPickerComponent } from '../Shared/number-picker';
import {OrderItemComponent} from './order-item/order-item.component';


const PRODUCTS_COMPONENTS =  [
  ProductsComponent,
  ProductsCardComponent,
  ProductsListComponent,
  OrderCartItemComponent,
  OrderCartItemComponent,
  OrderCartListComponent,
  OrderMyOrdersComponent,
  NumberPickerComponent,
  OrderItemComponent
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
