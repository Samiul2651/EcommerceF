import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user';
import { jwtDecode } from "jwt-decode";
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


  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    if(localStorage.getItem('token'))return true;
    return false;
  }
  getHeaders(){
    if(this.isLoggedIn())
      return { 'Authorization': `Bearer ${this.getToken()}` };
    else return { 'Authorization': `Bearer ` };;
  }

  logout(){
    localStorage.removeItem('token');
  }

  getAccessToken(tokenDto : any){
    return this.http.post(this.url + '/token', tokenDto);
  }

  // isTokenExpired(){
  //   const token = this.getToken();
  //   if(!token)return true;
  //   const decoded = jwtDecode(token);
  //   if(!decoded.exp) return true;
  //   const expirationDate = decoded.exp * 1000;
  //   const now = new Date().getTime();
  //   return expirationDate < now;
  // }

  
}
