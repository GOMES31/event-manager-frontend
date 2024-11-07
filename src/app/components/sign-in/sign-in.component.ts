import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninDTO } from 'src/app/common/dtos/signinDTO';
import { ApiResponse } from 'src/app/common/interfaces/api-response';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'evently-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage: string = ''; // Error message for user not registered
  successMessage: string = ''; // Success message on successful authentication
  successAlertMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.successAlertMessage = this.alertService.getAlertMessage();

  }

  // Submits the sign-in form
  onSubmit(): void {
    if (this.signInForm.valid) {
      const signinDTO: SigninDTO = {
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value
      };


    
    // Call AuthService to authenticate the user and handle possible errors  
    this.authService.signIn(signinDTO).subscribe({
      next:(response: ApiResponse) => {

        // Set success message
        this.successMessage = response.message || 'Signed in successfully!';

        // Clear previous error messages
        this.errorMessage = '';

        // Reset sign-in form
        this.signInForm.reset();

        // Set the message in the alert service to display it home page
        this.alertService.setAlertMessage(this.successMessage);

        if(response.user) {
            // Store the current user in the session
            this.sessionService.setSession(response.user);         
        }

        // Redirect to home page on successful registration
        this.router.navigate(['/home']);


      },
      error: (error: HttpErrorResponse) => {
          // Error 404 (NOTFOUND) - Displays "This email is not registered!" if email is not found
          if(error.status === 404){ 

            // Display the error message on the form
            this.signInForm.controls['email'].setErrors({ emailNotRegistered: true});

          }
          // Error 401 (UNAUTHORIZED) - Display "Incorrect password!" if the password is wrong
          else if(error.status === 401){

            // Display the error message on the form
            this.signInForm.controls['password'].setErrors({ incorrectPassword: true});
          }
          // If any other error occurs, display 'An unexpected error occurred'
          else{
            this.errorMessage = 'An unexpected error occurred.'
          }
        }
      });
    }
  }

  closeMessage(): void {

    // Clear the message from the service
    this.alertService.clearAlertMessage();
     // Clear the message in the component
    this.successAlertMessage = null;
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  
}
