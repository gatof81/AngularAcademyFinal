import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: '[app-order-item]',
  template: `
    <td>{{order._id}}</td>
    <td><span *ngFor="let prod of order.products">{{prod.prod_name}} </span></td>
    <td>{{order.status}}</td>
    <td *ngIf="user.userRole !== 0">{{order.owner}} 
      <button *ngIf="user.userRole === 2" (click)="deleteOrder()">Delete</button>
      <button *ngIf="user.userRole === 2" (click)="toggleState()">Change State</button>
    </td>
  `,
  styles: []
})
export class OrderItemComponent implements OnInit {
  @Input() order;
  @Input() user;
  @Output() onDelete = new EventEmitter();
  @Output() onChangeState = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteOrder(){
    this.onDelete.emit(this.order);
  }

  toggleState(){
    this.order.status = !this.order.status;
    this.onChangeState.emit(this.order);
  }

}
