import { Component } from '@angular/core';
import { Aside } from './aside/aside';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Aside, Footer, Header, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
