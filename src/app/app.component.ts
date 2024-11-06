import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-frontend';
  showNavBar : boolean = true;
  constructor(router : Router) {
    router.events.subscribe(event => {
      if(router.url.includes('register') || router.url.includes('login')){
        this.showNavBar = false;
      }
      else this.showNavBar = true;
    })
  }
}
