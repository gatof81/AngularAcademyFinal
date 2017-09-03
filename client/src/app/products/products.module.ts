import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { PRODUCTS_STATES } from './products.states';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProductsComponent} from './products.component';
import {ProductsCardComponent} from './products-card/products-card.component';
import {ProductsListComponent} from './products-list/products-list.component';

const PRODUCTS_COMPONENTS =  [
  ProductsComponent, ProductsCardComponent, ProductsListComponent
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
