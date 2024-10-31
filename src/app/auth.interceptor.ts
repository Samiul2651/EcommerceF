import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let token : string = getToken() ?? "";
  if(token && token != ""){
    if(isTokenExpired()){
      console.log("Expired");
      setTimeout(() => {
        let refrshToken = localStorage.getItem('refreshToken');
        let email = localStorage.getItem('email');
        let tokenDto = {
          token : refrshToken,
          email : email
        }
        console.log(tokenDto);
        authService.getAccessToken(tokenDto)
        .subscribe((response : any) => {
          token = response.token;
          localStorage.setItem('token', token);
          var cloned = req.clone({
            setHeaders: {
              Authorization : `Bearer ${token}`
            }
          });
          return next(cloned);
        }) 
      }, 2000);
      
      authService.getAccessToken(tokenDto)
        .subscribe((response : any) => {
          token = response.token;
          localStorage.setItem('token', token);
          var cloned = req.clone({
            setHeaders: {
              Authorization : `Bearer ${token}`
            }
          });
          return next(cloned);
        })
    }
    var cloned = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};


function getToken(): string | null {
  return localStorage.getItem('token');
}

function isTokenExpired(){
  const token = getToken();
  if(!token)return true;
  const decoded = jwtDecode(token);
  if(!decoded.exp) return true;
  const expirationDate = decoded.exp * 1000;
  const now = new Date().getTime();
  return expirationDate < now;
}
