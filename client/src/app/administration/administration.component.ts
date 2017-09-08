import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `
    <div class="container-fluid pb-5">
      <app-admin-prod-input-form></app-admin-prod-input-form>
      <app-admin-product-list></app-admin-product-list>
    </div>
  `,
  styles: []
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
