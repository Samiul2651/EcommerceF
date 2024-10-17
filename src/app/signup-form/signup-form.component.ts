import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  
  constructor(private http: HttpClient){}
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
    let getUrl = this.url+'Customer/login/'+this.email?.value+'/'+this.password?.value;
    console.log(getUrl);
    this.http.get(getUrl)
      .subscribe(response => {
        console.log(response);
      }, (error : Response) =>{
        alert(error.status);
        console.log(error);
      }
    );
  }
}
