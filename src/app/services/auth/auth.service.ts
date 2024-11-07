import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SignupDTO } from 'src/app/common/dtos/signupDTO';
import { SigninDTO } from 'src/app/common/dtos/signinDTO';
import { ApiResponse } from 'src/app/common/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base URL for authentication endpoints
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) { }

  // Registers a new user
  signUp(newUser: SignupDTO): Observable<ApiResponse> {
    const signUpUrl = `${this.baseUrl}/signup`;

    // Explicity set content type to JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<ApiResponse>(signUpUrl, newUser, { headers }).pipe(
      catchError((error) => {
            // Return an error if it catches any
            return throwError(() => error); 
      })
    );
  }

  signIn(user: SigninDTO): Observable<ApiResponse> {

    const signInUrl = `${this.baseUrl}/signin`;

    // Explicity set content type to JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.httpClient.post<ApiResponse>(signInUrl, user, { headers }).pipe(
      catchError((error) => {
            // Return an error if it catches any
            return throwError(() => error); 
      })
    );
  }



  
}
