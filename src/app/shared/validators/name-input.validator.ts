import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameInputValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value || '';

        if (!(/^[А-Яа-я\s]+$/.test(value))) {
            return { nameInputIncorrect: true };
        }

        const words = value.trim().split(/\s+/);
        if (!(words.every(word => word[0] === word[0].toUpperCase()))) {
            return { nameInputIncorrect: true };
        }

        return null;
    }
}