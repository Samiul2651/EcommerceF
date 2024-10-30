import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = getToken();
  if(token){
    if(isTokenExpired()){
      
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
