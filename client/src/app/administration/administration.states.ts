import {Ng2StateDeclaration} from '@uirouter/angular';
import {DataService} from "../services/user.services";
import {AdministrationComponent} from './administration.component';


export function login(transition) {
  let dataSvc = transition.injector().get(DataService);
  dataSvc.dispatchLoad();
}

export let ADMINISTRATION_SATES: Ng2StateDeclaration[] = [
  {
    name: 'admin',
    url: '/admin',
    component: AdministrationComponent,
  }
];
