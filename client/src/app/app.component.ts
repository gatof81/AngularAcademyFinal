import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-toggleable-md navbar-inverse fixed-top">
                <a class="navbar-brand" href="#">Academy-E</a>
                <a class="nav-link" uiSref="login">Login</a>
            </nav>
  <toaster-container></toaster-container>
            <ui-view></ui-view>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
