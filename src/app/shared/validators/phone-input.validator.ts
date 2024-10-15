import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumber = control.value;
        const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

        return regex.test(phoneNumber) ? null : { invalidPhone: true };
    }
}