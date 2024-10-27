import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  url = "https://localhost:7276/api/Customer";

  register(user : User){
    return this.http.post(this.url, user);
  }

  login(user : User){
    return this.http.post(this.url + "/login", user);
  }
}
