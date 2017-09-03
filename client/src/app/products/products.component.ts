import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <!-- viewport for child view -->
    <app-product-list></app-product-list>
  `,
  styles: []
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
