import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import { Injector } from '@angular/core';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'products' });
}

export let MAIN_STATES: Ng2StateDeclaration[] = [
  {
    url: '/login',
    name: 'login.**',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    name: 'products.**',
    url: '/products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    name: 'cart.**',
    url: '/cart',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    name: 'admin.**',
    url: '/admin',
    //canActivate: [ UserGuard ],
    loadChildren: './administration/administration.module#AdministrationModule',
    //onEnter: requireAdmin
  }
];
