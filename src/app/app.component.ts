import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-frontend';
  _login : boolean = true;

  loginMode() : boolean{
    return this._login;
  }

  registerMode(): boolean{
    return !this._login;
  }

  changeMode(){
    this._login = !this._login;
    console.log("Changed");
  }
}
