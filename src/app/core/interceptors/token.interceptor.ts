import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const currentUser = authService.currentUserValue;

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.updateUserSubject(null);

        const refreshToken = localStorage.getItem(AuthService.refreshTokenKey) ?? null;
        if (refreshToken) {

          return authService.refreshToken().pipe(
            switchMap(response => {
              authService.updateUserSubject(response.data.accessToken)
              localStorage.setItem(AuthService.accessTokenKey, response.data.accessToken)

              const currentUser = authService.currentUserValue;
              if (currentUser) {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                  }
                });
              }
              return next(req);
            })
          )
        }
      }

      return throwError(error);
    })
  )
};
