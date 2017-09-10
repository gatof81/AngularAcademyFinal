import {Ng2StateDeclaration} from '@uirouter/angular';
import {DataService} from "../services/user.services";
import {AdministrationComponent} from './administration.component';
import {AdminProdScreenComponent} from './admin-prod-screen/admin-prod-screen.component';
import {AdminUserScreenComponent} from './admin-user-screen/admin-user-screen.component';


export function login(transition) {
  let dataSvc = transition.injector().get(DataService);
  dataSvc.dispatchLoad();
}

export let ADMINISTRATION_SATES: Ng2StateDeclaration[] = [
  {
    name: 'admin',
    url: '/admin',
    component: AdministrationComponent,
  },
  {
    name: 'admin.products',
    url: '/admin/products',
    component: AdminProdScreenComponent,
  },
  {
    name: 'admin.user',
    url: '/admin/user',
    component: AdminUserScreenComponent
  }
];
