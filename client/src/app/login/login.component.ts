import {Component, OnDestroy, OnInit} from '@angular/core';
import { StateService } from '@uirouter/angular';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <!-- viewport for child view -->
      <ui-view></ui-view>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(public stateService: StateService) {
    this.stateService.go('login.login-input');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
