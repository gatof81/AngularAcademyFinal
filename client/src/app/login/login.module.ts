import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { LOGIN_STATES } from './login.states';
import { LoginComponent } from './login.component';
import { LoginInputComponent } from './login-input/login-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RegisterInputComponent} from './register-input/register-input.component';
import { RecaptchaModule } from 'ng2-recaptcha';

const LOGIN_COMPONENTS =  [
 LoginComponent, LoginInputComponent, RegisterInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    UIRouterModule.forChild({
      states: LOGIN_STATES,
    }),

  ],
  declarations: LOGIN_COMPONENTS
})
export class LoginModule { }
