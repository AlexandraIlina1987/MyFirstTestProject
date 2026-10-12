import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../services/user';
import { DatePipe } from '@angular/common';
import { Menu } from './menu/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, Menu, MatButtonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  date = signal(new Date());
  user = inject(User);
  userLogin: string = '';

  menuItems = [
    {
      route: '',
      title: 'Home',
    },
    {
      route: 'settings',
      title: 'Settings',
    },
  ];

  ngOnInit(): void {
    this.userLogin = this.user.getUser()?.login || '';
    setInterval(() => {
      this.date.set(new Date());
      //console.log('date', this.date);
    }, 1000);
  }
}
