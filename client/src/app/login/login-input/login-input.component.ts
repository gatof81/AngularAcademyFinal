import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/user';
import { StateService } from '@uirouter/angular';


@Component({
  selector: 'app-login-input',
  template: `
    <div class="row">
      <div class="form-group">
        <div class="form-control input-space">
          <input placeholder="Login Email.." class="form-control" name="email" [formControl]="loginForm.controls['email']">
        </div>
        <div class="form-control input-space">
          <input placeholder="Password.." class="form-control" name="password" [formControl]="loginForm.controls['password']">
        </div>
        <button [disabled]="!isValid()" (click)="login()">Login</button>
      </div>
    </div>
  `,
  styles: []
})
export class LoginInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'modal-visible';
  @Output() onLogin = new EventEmitter<string>();
  loginForm: FormGroup;
  private alive = true;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.loginForm.valid) {
      this.login();
    }
  }

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private stateService: StateService) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.store.select(fromRoot.getUser)
      .takeWhile(() => this.alive).subscribe(user => {
      if(user.token)
        this.stateService.go('products');
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  isValid() {
    let valid = this.loginForm.valid;
    return valid;
  }

  login() {
    console.log(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    this.store.dispatch(new data.LoginAction({username: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value}));
    //this.newCardForm.controls['text'].setValue('');
    // this.newCardForm.reset();
  }


}
