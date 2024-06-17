import { AbstractControl, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn =
  (group: AbstractControl): {
    [key: string]: any
  } | null => {
    let password = group.get('password');
    let confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null;
  };