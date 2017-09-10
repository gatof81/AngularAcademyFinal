import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';


@Component({
  selector: 'app-admin-user-screen',
  template: `
    <div>
      <app-admin-user-list [user]="user"></app-admin-user-list>
    </div>
  `,
  styles: []
})
export class AdminUserScreenComponent implements OnInit, OnDestroy {
  public user:User;
  private alive=true;

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getUser)
      .takeWhile(() => this.alive).subscribe(user => {
      if(user.token){
        this.user = user;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.alive = false;
  }

}
