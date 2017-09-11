import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: '[app-order-cart-item]',
  template: `
    <td>{{product.prod_name}}</td>
    <td>{{product.price | currency}}</td>
    <td>
      <angular2-number-picker [min]="1" [max]="6" [step]="1" [precision]="1" [inputDisabled]="true" (onChange)="onNumberChanged($event)"></angular2-number-picker>
    </td>
  `,
  styles: []
})
export class OrderCartItemComponent implements OnInit {
  @Input() product:Product;
  @Output() onQuantity = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onNumberChanged(number){
    this.onQuantity.emit(number);
  }

}
