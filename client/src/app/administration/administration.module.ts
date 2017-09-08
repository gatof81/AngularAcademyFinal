import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { ADMINISTRATION_SATES } from './administration.states';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdministrationComponent} from './administration.component';
import {AdminProdInputFormComponent} from './admin-prod-input-form/admin-prod-input-form.component';
import {AdminProdListComponent} from './admin-prod-list/admin-prod-list.component';
import {AdminProdItemComponent} from './admin-prod-item/admin-prod-item.component';
import { AdminProdEditComponent } from './admin-prod-edit/admin-prod-edit.component';

const ADMIN_COMPONENTS =  [
  AdministrationComponent,
  AdminProdInputFormComponent,
  AdminProdListComponent,
  AdminProdItemComponent,
  AdminProdEditComponent
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
