import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../data-access/services/auth.service';

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authReq = addToken(req, authService.getAccessToken());

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || req.url.includes('/api/auth/')) {
        return throwError(() => err);
      }

      const refreshToken = authService.getRefreshToken();

      if (!refreshToken) {
        authService.logout();
        return throwError(() => err);
      }

      return authService.refresh(refreshToken).pipe(
        switchMap((res) => next(addToken(req, res.accessToken))),
        catchError((refreshErr) => {
          authService.logout();
          return throwError(() => refreshErr);
        })
      );
    })
  );
};

function addToken(
  req: HttpRequest<unknown>,
  token: string | null
) {
  if (!token) return req;
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}
