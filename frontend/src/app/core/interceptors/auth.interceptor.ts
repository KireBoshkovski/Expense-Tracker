import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.getAccessToken();

    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                return authService.refreshToken().pipe(
                    switchMap((res) => {
                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${res.accessToken}`,
                            },
                        });
                        return next(newReq);
                    })
                );
            }
            return throwError(() => err);
        })
    );
};
