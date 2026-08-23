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
    const users: string[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.includes(this.login)) {
      users.push(this.login);
      console.log(users);
      localStorage.setItem('users', JSON.stringify(users));

      //localStorage.setItem('user', this.login);
    }
  }
}
