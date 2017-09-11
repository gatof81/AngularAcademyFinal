import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UIRouterModule} from '@uirouter/angular';
import { MAIN_STATES, uiRouterConfigFn } from './app.states';
import { reducers, metaReducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { DataEffectsUsers } from './effects/user'
import { DataEffectsProducts } from './effects/products'
import { DataEffectsOrders } from './effects/order'
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/user.services';
import { ProductsService } from './services/products.services';
import { OrderServices } from './services/order.services';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([DataEffectsProducts, DataEffectsUsers, DataEffectsOrders]),
    ToasterModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      useHash: true,
      config: uiRouterConfigFn
    })
  ],
  providers: [
    DataService,
    ProductsService,
    OrderServices,
    {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
