import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Tours as ToursService } from '../../services/tours';
import { ITour, IToursResponse } from '../../models/tours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HighlightActive } from '../../shared/directives/highlight-active';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tours',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    HighlightActive,
    MatInputModule,
    MatFormFieldModule,
  ], // импортируем класс директивы
  templateUrl: './tours.html',
  styleUrl: './tours.scss',
})
export class Tours implements OnInit {
  // указываем декоратор к свойству класса
  @ViewChild('highLightDirective', { read: HighlightActive }) highLightDirective!: HighlightActive;
  private toursService = inject(ToursService);
  private router = inject(Router);

  //tours = signal<ITour[]>([]);
  tours: ITour[] = [];
  toursCopy: ITour[] = [];
  toursLoaded = false;

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data: IToursResponse) => {
      console.log('data tours', data.tours);
      // this.tours.set(data.tours);
      this.tours = data.tours;
      this.toursCopy = [...this.tours];
      this.toursLoaded = true;

      console.log('this.tours', this.tours);
    });
  }

  updateView(): void {
    setTimeout(() => {
      this.highLightDirective?.initItems();
    }, 0);
  }

  goToTour(tour: ITour) {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`]);
    }
  }

  // sort(item1: HTMLElement, item2: HTMLElement) {
  //   return item1.innerHTML.localeCompare(item2.innerHTML);
  // }

  onEnter(ev: { el: HTMLElement; index: number }) {
    const tourId = ev.el.getAttribute('data-tour-id');
    if (tourId) {
      this.goToTour({ id: tourId } as ITour);
    }
    console.log('tourId', tourId);
  }

  searchTours(Ev: Event) {
    //console.log('Ev!!!', Ev);
    const searchValue = (Ev.target as HTMLInputElement).value;
    //console.log('searchValue', searchValue);
    const regExp = new RegExp(searchValue, 'i');
    if (!searchValue) {
      this.tours = [...this.toursCopy];
    } else {
      this.tours = this.toursCopy.filter(
        (el) => regExp.test(el.name) || regExp.test(el.description),
      );
    }
    this.updateView();
  }
}
