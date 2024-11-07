import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private message: string | null = null;

  constructor() { }

  setAlertMessage(message: string): void{
    this.message = message;
  }

  getAlertMessage(): string | null {
    return this.message;
  }

  clearAlertMessage(): void{
    this.message = null;
  }
}
