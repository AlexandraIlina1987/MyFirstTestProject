import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, MatButtonModule],
  templateUrl: './authorization.html',
  styleUrl: './authorization.scss',
})
export class Authorization {
  login: string = '';
  password: string = '';

  onAuth(ev: Event): void {
    if (localStorage.getItem('user') === this.login) {
      console.log('Success login');
    } else {
      console.log('Login failed');
    }
  }
}
