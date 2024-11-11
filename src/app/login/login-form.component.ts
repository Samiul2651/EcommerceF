import { AuthService } from './../services/auth.service';
import { Component} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent {
  
  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    
  ){ }
  // form = new FormGroup({
  //   email: new FormControl('',[
  //     Validators.required,
  //     Validators.email
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(6),
  //   ])
  // });
  form = this.formBuilder.group({
    email : ['',[
      Validators.required,
      Validators.email
    ] ],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
    ]]
  });

  

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  login(){
    
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
    console.log(user);
    this.authService.login(user)
      .subscribe((response : any) => {
        if(response.customer.token){
          //console.log(response.customer.token);
          localStorage.setItem("token", response.customer.token);
          localStorage.setItem("refreshToken", response.customer.refreshToken);
          localStorage.setItem("email", response.customer.email);
          // console.log(response);
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 2000);
          // this.router.navigateByUrl('/product-list');
        }
        
      }, (error : Response) =>{
        alert(error.status);
        console.log(error);
      }
    );
  }

  register(){
    this.router.navigateByUrl('/register');
  }
}
