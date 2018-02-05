import { Component } from '@angular/core';

import { Life } from './life.component';

@Component({
  selector: 'app-root',
  templateUrl: '../assets/partials/life.html',
  styleUrls: ['../assets/css/grid.css']
})

export class AppComponent {
  title = 'app';

  constructor() {
  	let life = new Life();
  }
}
