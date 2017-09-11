import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-my-orders',
  template: `
    <!-- viewport for child view -->
    <ui-view></ui-view>
  `,
  styles: []
})
export class OrderMyOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
