import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefaultResponseType } from 'src/types/default-response.type';
import { UserInfoResponseType } from 'src/types/user-info-response.type';
import { LoginFieldsEnum } from 'src/types/login-fields.enum';
import { LoginResponseType } from 'src/types/login-response.type';
import { TokensKeysEnum } from 'src/types/tokens-keys.enum';
import { UserInfoKeysEnum } from 'src/types/user-info-keys.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupPayloadRequestType } from 'src/types/signup-payload-request.type';
import { TypeCheckingService } from 'src/app/shared/services/type-checking.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: string = environment.api;

  // Dependency Injections
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private typeChecker: TypeCheckingService
  ) { }

  // isAuth getter
  get isAuth(): boolean {
    return !!(
      this.cookieService.check(TokensKeysEnum.accessToken) &&
      this.cookieService.check(TokensKeysEnum.refreshToken) &&
      this.cookieService.check(TokensKeysEnum.userId) &&
      this.cookieService.check(UserInfoKeysEnum.name) &&
      this.cookieService.check(UserInfoKeysEnum.email)
    );
  }

  // tokens getter
  get tokens(): LoginResponseType | null {
    if (this.isAuth) {
      return {
        [TokensKeysEnum.accessToken]: this.cookieService.get(TokensKeysEnum.accessToken),
        [TokensKeysEnum.refreshToken]: this.cookieService.get(TokensKeysEnum.refreshToken),
        [TokensKeysEnum.userId]: this.cookieService.get(TokensKeysEnum.userId)
      }
    } else {
      return null;
    }
  }

  // userName getter
  get userName(): string | null {
    if (this.isAuth) {
      return this.cookieService.get(UserInfoKeysEnum.name);
    } else {
      return null;
    }
  }

  // Login Request Method
  public login(
    payload: {
      [LoginFieldsEnum.email]: string,
      [LoginFieldsEnum.password]: string,
      [LoginFieldsEnum.rememberMe]: boolean
    }
  ): Observable<UserInfoResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(
      `${this.api}/login`,
      payload
    ).pipe(
      map((res: LoginResponseType | DefaultResponseType) => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          throw new Error(res.message)
        }
        this.setTokens(res);
      }),
      switchMap((): Observable<UserInfoResponseType> => {
        return this.http.get<UserInfoResponseType | DefaultResponseType>(
          `${this.api}/users`
        ).pipe(
          map((res: UserInfoResponseType | DefaultResponseType) => {
            if (this.typeChecker.isDefaultResponseType(res)) {
              throw new Error(res.message);
            }
            this.setUserInfo(res);
            return res;
          })
        );
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400 || err.status === 401) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'Неизвестная ошибка');
        }
      })
    )
  }

  // SignUp Request Method
  public signUp(
    payload: SignupPayloadRequestType
  ): Observable<UserInfoResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(
      `${this.api}/signup`,
      payload
    ).pipe(
      map((res: LoginResponseType | DefaultResponseType) => {
        if (this.typeChecker.isDefaultResponseType(res)) {
          throw new Error(res.message)
        }
        this.setTokens(res);
      }),
      switchMap((): Observable<UserInfoResponseType> => {
        return this.http.get<UserInfoResponseType | DefaultResponseType>(`${this.api}/users`)
          .pipe(
            map((res: UserInfoResponseType | DefaultResponseType) => {
              if (this.typeChecker.isDefaultResponseType(res)) {
                throw new Error(res.message)
              }
              this.setUserInfo(res);
              return res;
            })
          );
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400 || err.status === 401) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'Неизвестная ошибка');
        }
      })
    )
  }

  // Refresh Tokens Request Method
  public refreshTokens() {
    return this.http.post<LoginResponseType | DefaultResponseType>(
      `${this.api}/refresh`,
      { [TokensKeysEnum.refreshToken]: this.cookieService.get(TokensKeysEnum.refreshToken) }
    ).pipe(
      tap((res: LoginResponseType | DefaultResponseType) => {
        if (this.typeChecker.isLoginResponseType(res)) {
          this.setTokens(res);
        }
      }),
      catchError(err => {
        this.logout().subscribe({
          complete: () => {
            this.snackBar.open('Вы вышли из системы');
          }
        });
        return throwError(() => err);
      })
    )
  }

  // Logout Request Method
  public logout(): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      `${this.api}/logout`,
      { [TokensKeysEnum.refreshToken]: this.cookieService.get(TokensKeysEnum.refreshToken) }
    ).pipe(
      finalize(() => {
        this.removeTokensAndUserInfo();
      })
    );
  }

  private setTokens(tokens: LoginResponseType) {
    [
      TokensKeysEnum.accessToken,
      TokensKeysEnum.refreshToken,
      TokensKeysEnum.userId
    ].forEach(key => {
      this.cookieService.set(key, tokens[key]);
    });
  }

  private setUserInfo(data: UserInfoResponseType) {
    [
      UserInfoKeysEnum.email,
      UserInfoKeysEnum.name
    ].forEach(key => {
      this.cookieService.set(key, data[key]);
    });
  }

  private removeTokensAndUserInfo(): void {
    [
      TokensKeysEnum.accessToken,
      TokensKeysEnum.refreshToken,
      TokensKeysEnum.userId,
      UserInfoKeysEnum.email,
      UserInfoKeysEnum.name
    ].forEach(key => {
      this.cookieService.delete(key);
    });
  }
}
