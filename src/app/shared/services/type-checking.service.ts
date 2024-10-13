import { Injectable } from '@angular/core';
import { DefaultResponseType } from 'src/types/default-response.type';
import { LoginResponseType } from 'src/types/login-response.type';
import { SignupFieldsEnum } from 'src/types/signup-fields.enum';
import { SignupPayloadRequestType } from 'src/types/signup-payload-request.type';
import { TokensKeysEnum } from 'src/types/tokens-keys.enum';
import { UserInfoKeysEnum } from 'src/types/user-info-keys.enum';
import { UserInfoResponseType } from 'src/types/user-info-response.type';

@Injectable({
  providedIn: 'root'
})
export class TypeCheckingService {

  public isLoginResponseType(obj: any): obj is LoginResponseType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj[TokensKeysEnum.accessToken] === 'string' &&
      typeof obj[TokensKeysEnum.refreshToken] === 'string' &&
      typeof obj[TokensKeysEnum.userId] === 'string'
    );
  }

  public isUserUnfoResponseType(obj: any): obj is UserInfoResponseType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj[UserInfoKeysEnum.id] === 'string' &&
      typeof obj[UserInfoKeysEnum.name] === 'string' &&
      typeof obj[UserInfoKeysEnum.email] === 'string'
    )
  }

  public isSignupPayloadRequestType(obj: any): obj is SignupPayloadRequestType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj[SignupFieldsEnum.name] === 'string' &&
      typeof obj[SignupFieldsEnum.email] === 'string' &&
      typeof obj[SignupFieldsEnum.password] === 'string'
    )
  }

  public isDefaultResponseType(obj: any): obj is DefaultResponseType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.error === 'boolean' &&
      typeof obj.message === 'string'
    )
  }
}
