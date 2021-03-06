import {Ng2StateDeclaration} from '@uirouter/angular';
import {DataService} from "../services/user.services";
import {ProductsComponent} from './products.component';
import {OrderMyOrdersComponent} from './order-my-orders/order-my-orders.component';
import {OrderCartListComponent} from './order-cart-list/order-cart-list.component';


export function login(transition) {
  let dataSvc = transition.injector().get(DataService);
  dataSvc.dispatchLoad();
}

export let PRODUCTS_STATES: Ng2StateDeclaration[] = [
  {
    name: 'products',
    url: '/products',
    component: ProductsComponent,
  },
  {
    name: 'cart',
    url: '/cart',
    component: OrderMyOrdersComponent
  },
  {
    name: 'cart.checkout',
    url: '/cart/checkout',
    component: OrderCartListComponent
  }
];
