import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../Shared/customValidators'
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as data from '../../actions/user';
import { StateService } from '@uirouter/angular';
import { RecaptchaComponent } from 'ng2-recaptcha';

@Component({
  selector: 'app-register-input',
  template: `
    <div class="row">
      <div class="form-group">
        <div class="form-control input-space">
          <input placeholder="Login Email.." class="form-control" name="email" [formControl]="registerForm.controls['email']">
        </div>
        <div class="form-control input-space">
          <input placeholder="Password.." class="form-control" name="password" [formControl]="registerForm.controls['password']">
        </div>
        <div class="form-control input-space">
          <input placeholder="Password Repeat" class="form-control" name="repeat" [formControl]="registerForm.controls['repeat']">
        </div>
        <!--<recaptcha (resolved)="resolved($event)" siteKey="6LcFgy4UAAAAAOlyqqjNiIxSNZNRF1Ntl3p5h15b"></recaptcha>-->
        <button [disabled]="!isValid()" (click)="register()">Register</button>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'modal-visible';
  @Output() onRegister = new EventEmitter<string>();
  //@ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  registerForm: FormGroup;
  private alive = true;
  private human = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.registerForm.valid) {
      this.register();
    }
  }

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private stateService: StateService) {
    this.registerForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'repeat': [null, Validators.compose([Validators.required, matchOtherValidator('password')])]
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

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
    if(captchaResponse) this.human = true;
    else this.human = false;

  }

  isValid() {
    let valid = this.registerForm.valid && this.human;
    return valid;
  }

  register() {
    this.store.dispatch(new data.RegisterUserAction({username: this.registerForm.controls['email'].value, password: this.registerForm.controls['password'].value}));
    //this.captcha.reset();
    this.registerForm.reset();
  }

}
