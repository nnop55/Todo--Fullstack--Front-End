import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 &&
        req.url.includes('refresh-token')) {
        localStorage.removeItem(AuthService.accessTokenKey);
        localStorage.removeItem(AuthService.refreshTokenKey);
        window.location.reload()
      }

      return throwError(err);
    })
  )
};
