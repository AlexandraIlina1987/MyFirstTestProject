import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationApi } from '../../../services/api/registration-api';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IRegister } from '../../../models/auth';
import { Loader as LoaderService } from '../../../services/loader';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, MatButtonModule, MatSnackBarModule, Loader, Loader, AsyncPipe],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  login: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  private userApiService = inject(RegistrationApi); // способ подключения сервиса
  private _snackBar = inject(MatSnackBar);
  private LoaderService = inject(LoaderService);
  loaderStatus$ = this.LoaderService.loader$;

  onAuth(ev: Event): void {
    const userData: IRegister = {
      login: this.login,
      email: this.email,
      password: this.password,
      //passwordRepeat: this.passwordRepeat,
    };
    console.log('userData', userData);
    this.userApiService.register(userData).subscribe(
      () => {
        this._snackBar.open('Registration successful', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this._snackBar.open('Registration failed. User already exists', 'Close', {
          duration: 3000,
        });
      },
    );
  }
}
