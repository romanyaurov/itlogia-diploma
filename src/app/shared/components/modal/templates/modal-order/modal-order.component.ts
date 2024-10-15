import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { OrderRequestType } from 'src/types/order-request.type';
import { AuthService } from 'src/app/core/auth/auth.service';
import { phoneValidator } from 'src/app/shared/validators/phone-input.validator';
import { Store } from '@ngrx/store';
import { ModalFormState } from 'src/app/shared/state/modal/modal.reducer';
import { clearModalFormData, saveModalFormData } from 'src/app/shared/state/modal/modal.actions';
import { Observable } from 'rxjs';
import { selectModalFormData } from 'src/app/shared/state/modal/modal.selectors';

@Component({
  selector: 'app-modal-order',
  standalone: false,
  templateUrl: './modal-order.component.html',
  styleUrl: './modal-order.component.scss'
})
export class ModalOrderComponent implements OnInit, OnDestroy {
  
  protected requestFormFields = RequestFormFields;
  protected orderServices = OrderServicesEnum;
  private reducedData$!: Observable<any>;
  private reducedData: {
    [RequestFormFields.name]: string | null,
    [RequestFormFields.phone]: string | null
  } | null = null;

  @Input() orderType: OrderServicesEnum | null = null;

  @Output() orderRequestEmitter: EventEmitter<OrderRequestType> = 
    new EventEmitter<OrderRequestType>();

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private store: Store<ModalFormState>
  ) { }

  protected orderForm: FormGroup<{
    [RequestFormFields.service]: FormControl<OrderServicesEnum>,
    [RequestFormFields.name]: FormControl<string>,
    [RequestFormFields.phone]: FormControl<string>
  }> = this.fb.group({
    [RequestFormFields.service]: [ OrderServicesEnum.advertisement ],
    [RequestFormFields.name]: ['', {
      validators: [Validators.required]
    }],
    [RequestFormFields.phone]: ['', {
      validators: [Validators.required, phoneValidator()]
    }]
  });

  ngOnInit(): void {
    if (this.orderType) {
      this.orderForm.patchValue({
        [RequestFormFields.service]: this.orderType
      });
      this.orderForm.get(RequestFormFields.service)?.disable();
    }

    this.reducedData$ = this.store.select(selectModalFormData);
    this.reducedData$.subscribe(modalFormData => {
      if (modalFormData) {
        this.reducedData = modalFormData;
      }
      if (this.authService.userName) {
        this.orderForm.patchValue({
          [RequestFormFields.name]: this.authService.userName
        });
        this.orderForm.get(RequestFormFields.name)?.disable();
      } else if (this.reducedData && this.reducedData[RequestFormFields.name]) {
        this.orderForm.patchValue({
          [RequestFormFields.name]: this.reducedData[RequestFormFields.name]
        })
      }
    })
    if (this.reducedData && this.reducedData[RequestFormFields.phone]) {
      this.orderForm.patchValue({
        [RequestFormFields.phone]: this.reducedData[RequestFormFields.phone]
      });
    }
  }

  protected onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.getRawValue();
      formData.phone = formData.phone.replace(/[^\d+]/g, '');
      this.orderForm.reset();
      this.store.dispatch(clearModalFormData());
      this.orderRequestEmitter.emit(formData);
    }
  }

  ngOnDestroy(): void {
    const name: string | undefined = 
      this.orderForm.get(RequestFormFields.name)?.value;
    const phone: string | undefined = 
      this.orderForm.get(RequestFormFields.phone)?.value;
    this.store.dispatch(saveModalFormData({
        modalFormData: {
        [RequestFormFields.name]: name ? name : '',
        [RequestFormFields.phone]: phone ? phone : ''
      }
    }));
  }

}
