import { CustomerService } from './../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    // private http: HttpClient,
    private customerService : CustomerService,
    private authService : AuthService
  ){}

  @Output() loginEvent = new EventEmitter();
  form = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    confirmEmail: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  });

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get confirmEmail(){
    return this.form.get('confirmEmail');
  }

  get password(){
    return this.form.get('password');
  }

  sendChange(){
    this.loginEvent.emit();
  }

  register(){
    if(this.email?.value != this.confirmEmail?.value){
      alert("Email Not Matched");
    }
    // let url = "https://localhost:7276/api/Customer";
    let user : User = {
      id : "",
      name : this.name?.value,
      email : this.email?.value,
      password : this.password?.value
    }
    this.authService.register(user)
      .subscribe(response =>{
        alert("Registration Successfull");
      }, error =>{
        // console.log(error);
        alert("Registration Error");
      });
    // console.log("ab");
  }
}
