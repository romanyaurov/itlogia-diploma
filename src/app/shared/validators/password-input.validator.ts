import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value || '';

        if (value.length < 8 || !(/[A-Z]/.test(value)) || !(/\d/.test(value))) {
            return { invalidPassword: true };
        }

        return null;
    }
}