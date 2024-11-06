import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignupDTO} from 'src/app/common/dtos/auth/signupDTO';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'evently-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string = ''; // Error message for email already in use
  successMessage: string = ''; // Success message on successful registration

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: CustomValidators.doPasswordsMatch('password', 'confirmPassword')
    });
  }

  // Submits the sign-up form
  onSubmit(): void {
    if (this.signUpForm.valid) {
      const signupDTO: SignupDTO = {
        name: this.signUpForm.get('name')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value
      };

      // Call AuthService to register the new user and handle possible errors
      this.authService.signUp(signupDTO).subscribe({
        next:(response) => {
          // Set success message
          this.successMessage = response.message || 'User registered successfully!';

          // Clear previous error messages
          this.errorMessage = '';

          // Clear email form errors
          this.signUpForm.controls['email'].setErrors(null);

          // Redirect to home page on successful registration
          console.log(this.successMessage);
        },
        error: (error: HttpErrorResponse) => {
          // Check error status and display error message
          if(error.status === 409){
            // Set the error message for the email control
            this.signUpForm.controls['email'].setErrors({ emailInUse: true});
          }
          else if(error.status >= 400 && error.status < 600){
            this.errorMessage = 'An expected error occurred.';
          }
        }
      });
    }
  }

  // Getter for form controls to improve readability
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
