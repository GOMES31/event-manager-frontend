import { FormGroup } from '@angular/forms';

export class CustomValidators {
  static doPasswordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['doPasswordsMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ doPasswordsMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
