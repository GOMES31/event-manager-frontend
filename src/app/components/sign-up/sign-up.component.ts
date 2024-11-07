import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignupDTO} from 'src/app/common/dtos/signupDTO';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiResponse } from 'src/app/common/interfaces/api-response';

@Component({
  selector: 'evently-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string = ''; // Error message for email already in use
  successMessage: string = ''; // Success message on successful registration

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private alertService: AlertService,
              private router: Router) {}

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
        next:(response: ApiResponse) => {
          // Set success message
          this.successMessage = response.message || 'User registered successfully!';

          // Clear previous error messages
          this.errorMessage = '';

          // Reset sign-up form
          this.signUpForm.reset();

          // Set the message in the alert service to display it in sign-in page
          this.alertService.setAlertMessage(this.successMessage);

          // Redirect to sign-in page on successful registration
          this.router.navigate(['/sign-in']);

        },
        error: (error: HttpErrorResponse) => {
          // Error 409 - Displays "This email is already in use!" if email is already registered
          if(error.status === 409){ 

            // Display the error message on the form
            this.signUpForm.controls['email'].setErrors({ emailInUse: true});

          }
          // If any other error occurs, display 'An unexpected error occurred'
          else{
            this.errorMessage = 'An unexpected error occurred.';
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
