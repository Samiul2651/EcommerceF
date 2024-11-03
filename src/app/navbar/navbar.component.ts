import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router : Router
  ){

  }
  home(){
    this.router.navigateByUrl('/product-list');
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  order(){
    this.router.navigateByUrl('/order');
  }
}
