import {Ng2StateDeclaration} from '@uirouter/angular';
import {DataService} from "../services/user.services";
import {ProductsComponent} from './products.component';


export function login(transition) {
  let dataSvc = transition.injector().get(DataService);
  dataSvc.dispatchLoad();
}

export let PRODUCTS_STATES: Ng2StateDeclaration[] = [
  {
    name: 'products',
    url: '/products',
    component: ProductsComponent,
  }
];