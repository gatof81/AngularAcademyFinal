import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/user';
import { StateService } from '@uirouter/angular';
import { RecaptchaComponent } from 'ng2-recaptcha';


@Component({
  selector: 'app-login-input',
  template: `
    <div class="row">
      <div class="form-group">
        <div class="form-control">
          <input placeholder="Login Email.." class="form-control" name="email" [formControl]="loginForm.controls['email']">
        </div>
        <div class="form-control">
          <input placeholder="Password.." class="form-control" name="password" [formControl]="loginForm.controls['password']">
        </div>
        <recaptcha (resolved)="resolved($event)" siteKey="6LcFgy4UAAAAAOlyqqjNiIxSNZNRF1Ntl3p5h15b"></recaptcha>
        <button [disabled]="!isValid()" (click)="login()">Login</button>
      </div>
    </div>
  `,
  styles: []
})
export class LoginInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col-8';
  @Output() onLogin = new EventEmitter<string>();
  @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  loginForm: FormGroup;
  private alive = true;
  private human = false;

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
        console.log(user)
      if(user.token) console.log('logged in')
      //this.stateService.go('products');
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
    if(captchaResponse) this.human = true;
    else this.human = false;

  }

  isValid() {
    let valid = this.loginForm.valid && this.human;
    return valid;
  }

  login() {
    console.log(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    this.store.dispatch(new data.LoginAction({username: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value}));
    this.captcha.reset();
    //this.newCardForm.controls['text'].setValue('');
    // this.newCardForm.reset();
  }


}
