import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken();
  if(token){
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
