import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UIRouterModule} from '@uirouter/angular';
import { MAIN_STATES, uiRouterConfigFn } from './app.states';
import { reducers, metaReducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './effects/user'
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/user.services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([DataEffects]),
    ToasterModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      useHash: true,
      config: uiRouterConfigFn
    })
  ],
  providers: [
    DataService,
    {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
