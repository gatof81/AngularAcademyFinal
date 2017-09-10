import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: '[app-admin-user-item]',
  template: `
    <td>
      {{ user.username }}
    </td>
    <td>
      {{ user.billingAddress }}
    </td>
    <td>
      {{ user.shippingAddress}}
    </td>
    <td>
      <button (click)="reset()">reset password</button>
      <button (click)="edit()">edit</button>
      <button (click)="delete()">delete</button>
    </td>
  `,
  styles: []
})
export class AdminUserItemComponent implements OnInit {
  @Input() user:User;
  @Output() onReset = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(){
    this.onEdit.emit(this.user);
  }

  delete(){
    this.onDelete.emit(this.user);
  }

  reset(){
    this.onReset.emit(this.user);
  }

}
