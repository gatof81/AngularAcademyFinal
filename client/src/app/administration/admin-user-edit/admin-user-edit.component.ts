import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'app-admin-user-edit',
  template: `
    <div *ngIf="visible">
      <div class="backdrop" (click)="cancel()"></div>
      <div class="modal-visible">
        <div>
          {{editingUser.username}}
        </div>
        <div class="form-group">
          <div class="form-control input-space">
            <input placeholder="Billing Address" class="form-control" name="billing" [formControl]="userEditForm.controls['billing']">
          </div>
          <div class="form-control input-space">
            <input placeholder="Shipping Address" class="form-control" name="shipping" [formControl]="userEditForm.controls['shipping']">
          </div>
          <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect"  [formControl]="userEditForm.controls['role']">
            <option *ngFor="let role of roles"
            [value]="role.value" [selected]="userRole(role.value)">{{role.role}}</option>
          </select>

          <button [disabled]="!isValid()" (click)="editUser()">Update</button>
          <button (click)="cancel()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminUserEditComponent implements OnInit, OnChanges {
  @Input() visible:boolean;
  @Input() editingUser:User;
  @Output() onCancel = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  public roles:Array<any> = [
    {
      role:'regular',
      value:0
    },
    {
      role:'manager',
      value:1
    },
    {
      role:'admin',
      value:2
    }
  ]

  public userEditForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.userEditForm = fb.group({
      'billing': [null, Validators.compose([Validators.minLength(3)])],
      'shipping': [null, Validators.compose([Validators.minLength(3)])],
      'role': [null]
    });
  }

  ngOnInit() {
  }

  cancel(){
    this.userEditForm.reset();
    this.onCancel.emit('cancel');
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.editingUser && changes.editingUser.currentValue){
      this.userEditForm.controls['billing'].setValue(changes.editingUser.currentValue.billingAddress);
      this.userEditForm.controls['shipping'].setValue(changes.editingUser.currentValue.shippingAddress);
    }
  }

  userRole(role){
    return role === this.editingUser.userRole;
  }

  editUser() {
    this.onUpdate.emit({
      billingAddress: this.userEditForm.controls['billing'].value,
      shippingAddress: this.userEditForm.controls['shipping'].value,
      userRole: this.userEditForm.controls['role'].value || this.editingUser.userRole,
      _id: this.editingUser._id
    });
    this.userEditForm.reset();
  }

  isValid(){
    let edited = this.userEditForm.controls['billing'].value != this.editingUser.billingAddress
      || this.userEditForm.controls['shipping'].value != this.editingUser.shippingAddress
      || this.userEditForm.controls['role'].value != this.editingUser.userRole;
    return this.userEditForm.valid && edited;
  }

}
