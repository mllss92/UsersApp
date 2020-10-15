import { Component } from '@angular/core';

import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  window = window;

  constructor(public sharedService: SharedService) { }


}
