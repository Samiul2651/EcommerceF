import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent {
  
  constructor(
    private customerService : CustomerService,
    private authService : AuthService
  ){}
  url = "https://localhost:7276/api/";
  form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  });

  

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
  @Output() registerEvent = new EventEmitter;
  sendChange(){
    // console.log("AAAAAAAA");
    this.registerEvent.emit();
  }

  login(){
    // let getUrl = this.url+'Customer/login/'+this.email?.value+'/'+this.password?.value;
    // console.log(getUrl);
    let userEmail = this.email?.value;
    if(userEmail == null)userEmail = "";
    let userPassword = this.password?.value;
    if(userPassword == null)userPassword = "";
    let user = {
      id : '',
      name : '',
      email : userEmail,
      password : userPassword

    }
    this.authService.login(user)
      .subscribe(response => {
        console.log(response);
      }, (error : Response) =>{
        alert(error.status);
        console.log(error);
      }
    );
  }
}
