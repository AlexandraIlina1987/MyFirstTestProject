import { Component } from '@angular/core';
import { Authorization } from './authorization/authorization';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-auth',
  imports: [Authorization, Registration],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {}
