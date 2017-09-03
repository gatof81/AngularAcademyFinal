import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { ADMINISTRATION_SATES } from './administration.states';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdministrationComponent} from './administration.component';

const ADMIN_COMPONENTS =  [
  AdministrationComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forChild({
      states: ADMINISTRATION_SATES,
    }),

  ],
  declarations: ADMIN_COMPONENTS
})
export class AdministrationModule { }
