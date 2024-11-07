import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from 'src/app/common/dtos/userDTO';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'user_session';
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authenticated$ = this.authenticatedSubject.asObservable(); // Expose the observable

  constructor() { }

  setSession(user: UserDTO): void{

    // Store the current user in the session
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
    this.authenticatedSubject.next(true);
  }

  getSession(): any | null{
    const session = localStorage.getItem(this.sessionKey);
    
    return session ? JSON.parse(session) : null;
  }

  endSession(): void {
    localStorage.removeItem(this.sessionKey);
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {

    // Check if there is a session; convert the session value to a boolean
    // `!!` ensures the return value is true if session data exists
    return !!this.getSession();
  }
}
