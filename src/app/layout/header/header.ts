import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  user = inject(User);
  userLogin: string = '';

  ngOnInit(): void {
    this.userLogin = this.user.getUser()?.login || '';
  }
}
