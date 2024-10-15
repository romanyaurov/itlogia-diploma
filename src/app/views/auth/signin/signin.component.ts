import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserInfoResponseType } from 'src/types/user-info-response.type';
import { LoginFieldsEnum } from 'src/types/login-fields.enum';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators/custom-email.validator';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  // For using in Template
  protected loginFieldsEnum = LoginFieldsEnum;
  // Flags
  protected isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  // DI
  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }
  
  // Form Fields Template
  protected signInForm: FormGroup<{
    [LoginFieldsEnum.email]: FormControl<string>,
    [LoginFieldsEnum.password]: FormControl<string>,
    [LoginFieldsEnum.rememberMe]: FormControl<boolean>
  }> = this.fb.group({
    [LoginFieldsEnum.email]: ['', {
      validators: [Validators.required, emailValidator()],
    }],
    [LoginFieldsEnum.password]: ['', {
      validators: [Validators.required, Validators.minLength(8)],
    }],
    [LoginFieldsEnum.rememberMe]: [false]
  });

  // Form Proccessing
  protected onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.getRawValue())
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
