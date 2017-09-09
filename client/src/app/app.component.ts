import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar></app-nav-bar>
  <toaster-container></toaster-container>
            <ui-view></ui-view>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent  {


}
