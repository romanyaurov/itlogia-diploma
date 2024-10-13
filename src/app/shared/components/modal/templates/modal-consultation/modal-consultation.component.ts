import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultationRequestType } from 'src/types/consultation-request.type';
import { SvgIconComponent } from '../../../common/svg-icon/svg-icon.component';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PhoneMaskDirective } from 'src/app/shared/directives/phone-mask.directive';

@Component({
  selector: 'app-modal-consultation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    PhoneMaskDirective
  ],
  templateUrl: './modal-consultation.component.html',
  styleUrl: './modal-consultation.component.scss'
})
export class ModalConsultationComponent implements OnInit {

  protected requestFormFields = RequestFormFields;
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private authService: AuthService = inject(AuthService);

  @Output() consultationRequestEmitter: EventEmitter<ConsultationRequestType> = 
    new EventEmitter<ConsultationRequestType>();

  protected consultationForm: FormGroup<{
    [RequestFormFields.name]: FormControl<string>,
    [RequestFormFields.phone]: FormControl<string>
  }> = this.fb.group({
    [RequestFormFields.name]: ['', {
      validators: [Validators.required]
    }],
    [RequestFormFields.phone]: ['', {
      validators: [Validators.required]
    }]
  });

  ngOnInit(): void {
    if (this.authService.userName) {
      this.consultationForm.patchValue({
        [RequestFormFields.name]: this.authService.userName
      });
      this.consultationForm.get(RequestFormFields.name)?.disable();
    }
  }

  protected onSubmit(): void {
    if (this.consultationForm.valid) {
      const formData = this.consultationForm.getRawValue();
      formData.phone = formData.phone.replace(/[^\d+]/g, '');
      this.consultationRequestEmitter.emit(formData);
    }
  }

}
