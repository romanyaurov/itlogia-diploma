import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomModalService } from 'src/app/shared/services/custom-modal.service';
import { FormStateService } from 'src/app/shared/services/form-state.service';
import { FormSaver } from 'src/app/shared/utils/form-saver.decorator';
import { TypeCheckingUtil } from 'src/app/shared/utils/type-checking.util';
import { emailValidator } from 'src/app/shared/validators/custom-email.validator';
import { nameInputValidator } from 'src/app/shared/validators/name-input.validator';
import { passwordValidator } from 'src/app/shared/validators/password-input.validator';
import { ModalFormSavedData } from 'src/types/modal-form-saved-data.interface';
import { ModalTemplatesEnum } from 'src/types/modal-templates.enum';
import { SignupFieldsEnum } from 'src/types/signup-fields.enum';
import { SignupFormFieldsType } from 'src/types/signup-form-fields.type';
import { UserInfoResponseType } from 'src/types/user-info-response.type';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
@FormSaver<ModalFormSavedData>('authForm', 'signUpForm')
export class SignupComponent {

  // For using in Template
  protected signupFieldsEnum = SignupFieldsEnum;
  protected modalTemplatesEnum = ModalTemplatesEnum;
  // Flags
  protected isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  // DI
  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private typeChecker: TypeCheckingUtil,
    protected modalService: CustomModalService,
    private formStateService: FormStateService
  ) { }

  // Form Fields Template
  protected signUpForm: FormGroup<{
    [SignupFieldsEnum.name]: FormControl<string>,
    [SignupFieldsEnum.email]: FormControl<string>,
    [SignupFieldsEnum.password]: FormControl<string>,
    [SignupFieldsEnum.agreement]: FormControl<boolean>
  }> = this.fb.group({
    [SignupFieldsEnum.name]: ['', {
      validators: [Validators.required, nameInputValidator()],
    }],
    [SignupFieldsEnum.email]: ['', {
      validators: [Validators.required, emailValidator()],
    }],
    [SignupFieldsEnum.password]: ['', {
      validators: [Validators.required, passwordValidator()],
    }],
    [SignupFieldsEnum.agreement]: [false, {
      validators: [Validators.requiredTrue]
    }]
  })

  // Form Proccessing
  protected onSubmit(): void {
    if (this.signUpForm.valid) {
      const signupRequestPayload = this.signUpForm
        .getRawValue() as Partial<SignupFormFieldsType>;
      delete signupRequestPayload.agreement;
      if (this.typeChecker.isSignupPayloadRequestType(signupRequestPayload)) {
        this.authService.signUp(signupRequestPayload)
          .subscribe({
            next: (response: UserInfoResponseType) => {
              this.snackBar.open(
                `Добро пожаловать, ${response.name}.`
              );
              this.router.navigate(['/']);
            },
            error: (err: string) => {
              this.snackBar.open(err);
            }
          });
      }
    }
  }
}
