import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultationRequestType } from 'src/types/consultation-request.type';
import { DefaultResponseType } from 'src/types/default-response.type';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { OrderRequestType } from 'src/types/order-request.type';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { RequestTypesEnum } from 'src/types/request-types.enum';
import { TypeCheckingUtil } from '../utils/type-checking.util';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {

  /* Attributes */
  // State Subject
  private isModalOpen: boolean = false;
  public isModalOpen$: Subject<boolean> = new Subject<boolean>();
  // Signals
  public modalState: WritableSignal<ModalTemplatesEnum | null> = 
    signal<ModalTemplatesEnum | null>(null);
  public modalOrderType: WritableSignal<OrderServicesEnum | null> =
    signal<OrderServicesEnum | null>(null);

  constructor(
    private http: HttpClient,
    private typeChecker: TypeCheckingUtil
  ) { }

  /* Methods */
  public open(
    templateName: ModalTemplatesEnum,
    params?: {
      orderType?: OrderServicesEnum
    }
  ): void {
    if (templateName) {
      this.isModalOpen = true;
      this.modalState.set(templateName);
      if (params && params.orderType) {
        this.modalOrderType.set(params.orderType);
      }
      document.body.style.overflow = 'hidden';
      this.isModalOpen$.next(this.isModalOpen);
    }
  }

  public close(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
    this.isModalOpen$.next(this.isModalOpen);
    this.modalState.set(null);
    this.modalOrderType.set(null);
  }

  public sendCallbackRequest(
    data: ConsultationRequestType | OrderRequestType
  ): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(
      `${environment.api}/requests`,
      this.modifyRequestBody(data)
    ).pipe(
      map((res: DefaultResponseType) => {
        if (res.error) {
          throw new Error(res.message);
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => err.error.message);
        } else {
          return throwError(() => 'Неизвестная ошибка');
        }
      })
    )
  }

  private modifyRequestBody(
    data: ConsultationRequestType | OrderRequestType
  ): ConsultationRequestType & {
    [RequestFormFields.type]: RequestTypesEnum.consultation
  } | OrderRequestType & {
    [RequestFormFields.type]: RequestTypesEnum.order
  } {
    if (this.typeChecker.isOrderRequestType(data)) {
      return {
        ...data,
        ...{[RequestFormFields.type]: RequestTypesEnum.order}
      };
    } else {
      return {
        ...data,
        ...{[RequestFormFields.type]: RequestTypesEnum.consultation}
      };
    }
  }
}
