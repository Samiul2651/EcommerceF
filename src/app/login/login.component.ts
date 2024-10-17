import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // template: `
  //   <input [(ngModel)]="email" />
  //   <input [(ngModel)]="password"/>
  //   <button (click)="login()">Submit</button>
  // `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email = "abc@email.com";
    password = "";
    url = "https://localhost:7276/api";
    constructor(private http: HttpClient){
      http.get('https://jsonplaceholder.typicode.com/posts')
        .subscribe(response =>{
          console.log(JSON.stringify(response));
        });
    }

    login(){
      
      console.log(this.email + " "  + this.password);
    }
}
