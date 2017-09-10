import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/user';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {User} from '../../models/user';

@Component({
  selector: 'app-admin-user-list',
  template: `
    <app-admin-user-edit
    [visible]="visible"
    [editingUser]="editingUser"
    (onUpdate)="onUpdate($event)"
    (onCancel)="editUser($event)"></app-admin-user-edit>
    <div class="row text-center">
      <table class="table table-stripped">
        <thead class="thead-inverse">
        <tr>
          <th class="text-center">User Name</th>
          <th class="text-center">Billing Address</th>
          <th class="text-center">Shipping Address</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" app-admin-user-item *ngFor="let users of getUsers() | async"
        [user]="users"
            (onDelete)="deleteUser($event)"
            (onEdit)="editUser($event)"
            (onReset)="resetPassword($event)">
          
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class AdminUserListComponent implements OnInit, OnDestroy, OnChanges {
  private alive = true;
  page:number = 0;
  private pageLength = 10
  public visible = false;
  public editingUser:User;
  @Input() user:User;

  constructor(private store: Store<fromRoot.State>) {

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.user.currentValue){
      if(this.user.token){
        this.store.dispatch(new data.GetAllUsersAction(this.user));
      }
    }
  }

  getUsers() {
    return this.store.select(fromRoot.getAllUsers)
      .takeWhile(() => this.alive);
  }

  editUser(user){
    this.visible = !this.visible;
    if(user !== 'cancel')
      this.editingUser = user;
    else
      this.editingUser = {};
  }

  onUpdate(user){
    this.visible = false;
    let payload = {
      user:user,
      token:this.user.token
    }
    this.store.dispatch(new data.UpdateAction(payload));
  }

  resetPassword(user){

  }

  deleteUser(user){
    if(user._id === this.user._id) return;
    let payload = {
      user: user,
      token: this.user.token
    }
    this.store.dispatch(new data.DeleteUserAction(payload));
  }

}
