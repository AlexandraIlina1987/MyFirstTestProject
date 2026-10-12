import { Component, inject } from '@angular/core';
import { Aside } from './aside/aside';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { RouterModule } from '@angular/router';
import { Loader } from '../shared/components/loader/loader';
import { Loader as LoaderService } from '../services/loader';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Aside, Footer, Header, RouterModule, Loader, Loader, AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private LoaderService = inject(LoaderService);
  loaderStatus$ = this.LoaderService.loader$;
}
