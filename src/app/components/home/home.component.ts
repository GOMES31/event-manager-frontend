import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'evently-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  successMessage : string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {

    const navigation = this.router.getCurrentNavigation();

    // Retrive success messages
      this.successMessage = navigation?.extras?.state?.['message'];


  }

  closeMessage(): void{
    this.successMessage = null;
  }

}
