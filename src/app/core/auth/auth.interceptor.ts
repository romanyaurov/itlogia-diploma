import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { LoginResponseType } from "src/types/login-response.type";
import { DefaultResponseType } from "src/types/default-response.type";
import { TypeCheckingUtil } from "src/app/shared/utils/type-checking.util"; 

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

    const authService: AuthService = inject(AuthService);
    const typeChecker: TypeCheckingUtil = inject(TypeCheckingUtil);
    let isRefreshing: boolean = false;
    const refreshTokenSubject: BehaviorSubject<string | null> = 
        new BehaviorSubject<string | null>(null);

    const addTokenToRequest = (
        req: HttpRequest<any>,
        token: string
    ): HttpRequest<any> => {
        return req.clone({
            headers: req.headers.set('x-auth', token)
        })
    }

    const handleTokenExpiredError = (
        req: HttpRequest<any>
    ): Observable<HttpEvent<any>> => {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshTokenSubject.next(null);

            return authService.refreshTokens().pipe(
                switchMap((newTokens: LoginResponseType | DefaultResponseType) => {
                    isRefreshing = false;
                    if (typeChecker.isLoginResponseType(newTokens)) {
                        refreshTokenSubject.next(newTokens.accessToken);
                        return next(addTokenToRequest(req, newTokens.accessToken));
                    } else {
                        return throwError(() => newTokens.message);
                    }
                }),
                catchError((err: HttpErrorResponse) => {
                    isRefreshing = false;
                    authService.logout();
                    return throwError(() => err);
                })
            );
        } else {
            return refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => 
                    next(addTokenToRequest(req, token!))
                )
            );
        }
    }

    const accessToken = authService.tokens?.accessToken;
    let authReq = req;
    if (accessToken) {
        authReq = addTokenToRequest(req, accessToken);
    }

    return next(authReq).pipe(
        catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 500) {
                return handleTokenExpiredError(req);
            } else {
                return throwError(() => err);
            }
        })
    )
}