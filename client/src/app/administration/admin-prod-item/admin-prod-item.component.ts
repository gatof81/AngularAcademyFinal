import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../models/product';
import {User} from '../../models/user';

@Component({
  selector: '[app-admin-prod-item]',
  template: `    
      <td>
        {{ product.prod_name }}
      </td>
      <td>
        {{ product.description }}
      </td>
      <td>
        {{ product.price | currency}}
      </td>
      <td>
        <button (click)="edit()">edit</button>
        <button *ngIf="user.userRole === 2" (click)="delete()">delete</button>
      </td>
  `,
  styles: []
})
export class AdminProdItemComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User;
  @Output() 'onRemove' = new EventEmitter<Product>();
  @Output() 'onEdit' = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.onRemove.emit(this.product);
  }

  edit(){
    this.onEdit.emit(this.product)
  }

}
