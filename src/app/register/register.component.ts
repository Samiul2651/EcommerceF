import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService
  ){}

  form = this.formBuilder.group({
    name: ['',[
      Validators.required,
    ]],
    email: ['',[
      Validators.required,
      Validators.email
    ]],
    confirmEmail: ['',[
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
    ]]
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

  register(){
    if(this.email?.value != this.confirmEmail?.value){
      alert("Email Not Matched");
    }
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
        alert("Registration Error");
      });
  }
}
