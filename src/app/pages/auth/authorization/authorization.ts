import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User } from '../../../services/user';
import { UserApi } from '../../../services/api/user-api';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule],
  templateUrl: './authorization.html',
  styleUrl: './authorization.scss',
})
export class Authorization implements OnInit, OnDestroy {
  private user = inject(User); // способ подключения сервиса
  login: string = '';
  password: string = '';
  saveInStore: boolean = false;
  private userApiService = inject(UserApi); // способ подключения сервиса
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router); // класс router является сервисом и может быть внедрен в компонент

  constructor(private user2: User) {
    console.log('Auth constructor init');
  } // способ подключения сервиса через конструктор

  ngOnInit(): void {
    console.log('Auth ngOnInit init');
  }
  ngOnDestroy(): void {
    console.log('Auth ngOnDestroy init');
  }

  onAuth(ev: Event): void {
    this.userApiService.auth({ login: this.login, password: this.password }).subscribe(
      () => {
        if (this.saveInStore) {
          this.user.saveUserInStore({ login: this.login });
          this.user.setUser({ login: this.login });
          //localStorage.setItem('user', this.login);
        } else {
          this.user.setUser({ login: this.login });
        }
        this.router.navigate(['/']);
      },
      () => {
        this._snackBar.open('Login failed', 'Close', {
          duration: 3000,
        });
      },
    );

    // const users: string[] = JSON.parse(localStorage.getItem('users') || '[]');
    // if (users.includes(this.login)) {
    //   alert('Login successful!');
    //   console.log('Login successful!');
    // } else {
    //   alert('Login failed');
    //   console.log('Login failed');
    // }
  }
}
