import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
        location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    })
  )
};
