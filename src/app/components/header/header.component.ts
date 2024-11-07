import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/common/dtos/userDTO';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'evently-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isMenuOpen: boolean = false;
  currentUser: UserDTO | null = null;
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.authenticated$.subscribe( authenticated => {
      this.isAuthenticated = authenticated;
      this.currentUser = this.sessionService.getSession();
    });
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(){
    this.isMenuOpen = false;
  }

  signOut(){
    this.sessionService.endSession();
    this.isAuthenticated = false;
  }

  getUserRole(): string{

    // Default to USER if no role is found
    return this.currentUser?.role || 'USER';
  }

}


