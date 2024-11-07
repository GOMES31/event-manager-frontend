import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'evently-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  successAlertMessage: string | null = null;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.successAlertMessage = this.alertService.getAlertMessage();
  }

  closeMessage(): void {

    // Clear the message from the service
    this.alertService.clearAlertMessage();
     // Clear the message in the component
    this.successAlertMessage = null;
  }


}
