import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-order-item]',
  template: `
    <td>{{order._id}}</td>
    <td><span *ngFor="let prod of order.products">{{prod.prod_name}} </span></td>
    <td>{{order.status}}</td>
  `,
  styles: []
})
export class OrderItemComponent implements OnInit {
  @Input() order;

  constructor() { }

  ngOnInit() {
  }

}
