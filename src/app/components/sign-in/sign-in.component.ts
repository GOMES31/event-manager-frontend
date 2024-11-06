import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninDTO } from 'src/app/common/dtos/auth/signinDTO';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'evently-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
    errorMessage: string = ''; // Error message for user not registered
  successMessage: string = ''; // Success message on successful sign in

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const signinDTO: SigninDTO = {
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value
      };

      // Call AuthService to register the new user and handle possible errors
      this.authService.signIn(signinDTO).subscribe({
        next:(response) => {
          // Set success message
          this.successMessage = response.message || 'Signed in successfully!';

          // Clear previous error messages
          this.errorMessage = '';

          console.log(this.successMessage);

        },
        error: (error: HttpErrorResponse) => {
          // Check error status and display error message
          if(error.status === 409){
            // Set the error message for the email control
            console.log(this.errorMessage);
          }
          else if(error.status >= 400 && error.status < 600){
            this.errorMessage = 'An expected error occurred.';
          }
        }
      });
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
