import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderServicesEnum } from 'src/types/order-services.enum';
import { SvgIconComponent } from '../../../common/svg-icon/svg-icon.component';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { OrderRequestType } from 'src/types/order-request.type';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PhoneMaskDirective } from 'src/app/shared/directives/phone-mask.directive';

@Component({
  selector: 'app-modal-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    PhoneMaskDirective
  ],
  templateUrl: './modal-order.component.html',
  styleUrl: './modal-order.component.scss'
})
export class ModalOrderComponent implements OnInit {
  
  protected requestFormFields = RequestFormFields;
  protected orderServices = OrderServicesEnum;
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private authService: AuthService = inject(AuthService);

  @Input() orderType: OrderServicesEnum | null = null;

  @Output() orderRequestEmitter: EventEmitter<OrderRequestType> = 
    new EventEmitter<OrderRequestType>();

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
      validators: [Validators.required]
    }]
  });

  ngOnInit(): void {
    if (this.orderType) {
      this.orderForm.patchValue({
        [RequestFormFields.service]: this.orderType
      });
      this.orderForm.get(RequestFormFields.service)?.disable();
    }
    if (this.authService.userName) {
      this.orderForm.patchValue({
        [RequestFormFields.name]: this.authService.userName
      });
      this.orderForm.get(RequestFormFields.name)?.disable();
    }
  }

  protected onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.getRawValue();
      formData.phone = formData.phone.replace(/[^\d+]/g, '');
      this.orderRequestEmitter.emit(formData);
    }
  }

}
