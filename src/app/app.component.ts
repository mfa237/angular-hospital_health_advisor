import { Component } from '@angular/core';
import 'jquery';

@Component({
  selector: 'app-root',
  template: `
  <navbar></navbar>
  <router-outlet></router-outlet>`
  
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent { }
