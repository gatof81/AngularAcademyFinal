import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `
    <div class="container-fluid pb-5">
      <!-- viewport for child view -->
      <ui-view></ui-view>
    </div>
  `,
  styles: []
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
