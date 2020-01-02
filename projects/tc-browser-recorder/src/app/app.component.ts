import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    chrome.tabs.getCurrent( function (tabs) {
      console.log(tabs);
    })
  }
}
