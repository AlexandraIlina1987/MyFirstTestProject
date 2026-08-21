import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, MatButtonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  login: string = '';
  password: string = '';
  passwordRepeat: string = '';
  email: string;

  onAuth(ev: Event): void {
    if (this.login) {
      localStorage.setItem('user', this.login);
    }
    console.log('ev', ev);
  }
}
