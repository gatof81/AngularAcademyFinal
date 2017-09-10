import {Component, OnDestroy, OnInit} from '@angular/core';
import { StateService } from '@uirouter/angular';
import 'rxjs/add/operator/takeWhile';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-login',
  template: `
    <div class="container-fluid pb-5">
      <!-- viewport for child view -->
      <ui-view></ui-view>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(private store: Store<fromRoot.State>, private stateService: StateService) {
    // this.store.select(fromRoot.getUser)
    //   .takeWhile(() => this.alive).subscribe(user => {
    //   if(!user.token) console.log('logged in')
    //   this.stateService.go('login.login-input');
    // })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
