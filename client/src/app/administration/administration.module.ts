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
import {AdminUserEditComponent} from './admin-user-edit/admin-user-edit.component';
import {AdminUserItemComponent} from './admin-user-item/admin-user-item.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminProdScreenComponent} from './admin-prod-screen/admin-prod-screen.component';
import {AdminUserScreenComponent} from './admin-user-screen/admin-user-screen.component';

const ADMIN_COMPONENTS =  [
  AdministrationComponent,
  AdminProdScreenComponent,
  AdminProdInputFormComponent,
  AdminProdListComponent,
  AdminProdItemComponent,
  AdminProdEditComponent,
  AdminUserEditComponent,
  AdminUserItemComponent,
  AdminUserListComponent,
  AdminUserScreenComponent
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
