import { FormGroup } from '@angular/forms';

export class CustomValidators {
    static doPasswordsMatch(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
                // return if another validator has already found an error
                return;
            }

            // set error on confirmPasswordControl if validation fails
            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ mustMatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        };
    }
}
