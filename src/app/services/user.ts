import { Injectable } from '@angular/core';
import { IUser } from '../models/auth';

// создаем сервис для  сохранения пользователя в браузере
@Injectable({
  // указываем, что сервис доступен глобально
  providedIn: 'root', // создаем сервис один раз и используем везде
})
export class User {
  // позволяет использовать сервис в любом компоненте
  user: IUser;
  saveUserInStore(user: IUser): void {
    this.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser {
    return this.user;
  }
  setUser(user: IUser): void {
    this.user = user;
  }
}
