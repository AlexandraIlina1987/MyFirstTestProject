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
    const users: string[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.includes(this.login)) {
      alert('Login successful!');
      console.log('Login successful!');
    } else {
      alert('Login failed');
      console.log('Login failed');
    }
  }
}
