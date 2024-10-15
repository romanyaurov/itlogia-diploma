import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConsultationRequestType } from 'src/types/consultation-request.type';
import { RequestFormFields } from 'src/types/request-form-fields.enum';
import { AuthService } from 'src/app/core/auth/auth.service';
import { phoneValidator } from 'src/app/shared/validators/phone-input.validator';
import { Observable } from 'rxjs';
import { ModalFormState } from 'src/app/shared/state/modal/modal.reducer';
import { Store } from '@ngrx/store';
import { selectModalFormData } from 'src/app/shared/state/modal/modal.selectors';
import { clearModalFormData, saveModalFormData } from 'src/app/shared/state/modal/modal.actions';

@Component({
  selector: 'app-modal-consultation',
  standalone: false,
  templateUrl: './modal-consultation.component.html',
  styleUrl: './modal-consultation.component.scss'
})
export class ModalConsultationComponent implements OnInit, OnDestroy {

  protected requestFormFields = RequestFormFields;
  private reducedData$!: Observable<any>;
  private reducedData: {
    [RequestFormFields.name]: string | null,
    [RequestFormFields.phone]: string | null
  } | null = null;

  @Output() consultationRequestEmitter: EventEmitter<ConsultationRequestType> = 
    new EventEmitter<ConsultationRequestType>();

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private store: Store<ModalFormState>
  ) { }

  protected consultationForm: FormGroup<{
    [RequestFormFields.name]: FormControl<string>,
    [RequestFormFields.phone]: FormControl<string>
  }> = this.fb.group({
    [RequestFormFields.name]: ['', {
      validators: [Validators.required]
    }],
    [RequestFormFields.phone]: ['', {
      validators: [Validators.required, phoneValidator()]
    }]
  });

  ngOnInit(): void {
    this.reducedData$ = this.store.select(selectModalFormData);
    this.reducedData$.subscribe(modalFormData => {
      if (modalFormData) {
        this.reducedData = modalFormData;
      }
      if (this.authService.userName) {
        this.consultationForm.patchValue({
          [RequestFormFields.name]: this.authService.userName
        });
        this.consultationForm.get(RequestFormFields.name)?.disable();
      } else if (this.reducedData && this.reducedData[RequestFormFields.name]) {
        this.consultationForm.patchValue({
          [RequestFormFields.name]: this.reducedData[RequestFormFields.name]
        })
      }
    })
    if (this.reducedData && this.reducedData[RequestFormFields.phone]) {
      this.consultationForm.patchValue({
        [RequestFormFields.phone]: this.reducedData[RequestFormFields.phone]
      });
    }
  }

  protected onSubmit(): void {
    if (this.consultationForm.valid) {
      const formData = this.consultationForm.getRawValue();
      formData.phone = formData.phone.replace(/[^\d+]/g, '');
      this.consultationForm.reset();
      this.store.dispatch(clearModalFormData());
      this.consultationRequestEmitter.emit(formData);
    }
  }

  ngOnDestroy(): void {
    const name: string | undefined = 
      this.consultationForm.get(RequestFormFields.name)?.value;
    const phone: string | undefined = 
      this.consultationForm.get(RequestFormFields.phone)?.value;
    this.store.dispatch(saveModalFormData({
        modalFormData: {
        [RequestFormFields.name]: name ? name : '',
        [RequestFormFields.phone]: phone ? phone : ''
      }
    }));
  }

}
