import { Component } from '@angular/core';
import { Authorization } from './authorization/authorization';
import { Registration } from './registration/registration';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-auth',
  imports: [Authorization, Registration, MatTabsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {}
