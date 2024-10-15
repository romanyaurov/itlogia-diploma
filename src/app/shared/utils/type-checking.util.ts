import { Injectable } from '@angular/core';
import { DefaultResponseType } from 'src/types/default-response.type';
import { LoginResponseType } from 'src/types/login-response.type';
import { OrderRequestType } from 'src/types/order-request.type';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { SignupFieldsEnum } from 'src/types/signup-fields.enum';
import { SignupPayloadRequestType } from 'src/types/signup-payload-request.type';
import { TokensKeysEnum } from 'src/types/tokens-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class TypeCheckingUtil {

  public isLoginResponseType(obj: any): obj is LoginResponseType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj[TokensKeysEnum.accessToken] === 'string' &&
      typeof obj[TokensKeysEnum.refreshToken] === 'string' &&
      typeof obj[TokensKeysEnum.userId] === 'string'
    );
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

  public isOrderRequestType(obj: any): obj is OrderRequestType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj[RequestFormFields.name] === 'string' &&
      typeof obj[RequestFormFields.phone] === 'string' &&
      typeof obj[RequestFormFields.service] === 'string'
    )
  }
}
