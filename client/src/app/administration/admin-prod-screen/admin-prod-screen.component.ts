import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-prod-screen',
  template: `  
    <div>
      <app-admin-prod-input-form></app-admin-prod-input-form>
      <app-admin-product-list></app-admin-product-list>
    </div>
  `,
  styles: []
})
export class AdminProdScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
