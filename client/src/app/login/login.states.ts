import {Ng2StateDeclaration} from '@uirouter/angular';
import {LoginComponent} from './login.component';
import {DataService} from "../services/user.services";
import {LoginInputComponent} from './login-input/login-input.component';
import {RegisterInputComponent} from './register-input/register-input.component';



export function login(transition) {
  let dataSvc = transition.injector().get(DataService);
  dataSvc.dispatchLoad();
}

export let LOGIN_STATES: Ng2StateDeclaration[] = [
  {
    name: 'login',
    url: '/login',
    component: LoginComponent,
  },
  {
    name:'login.login-input',
    url: '/login-input',
    component: LoginInputComponent
  },
  {
    name:'login.register-input',
    url: '/register-input',
    component: RegisterInputComponent
  }
];
