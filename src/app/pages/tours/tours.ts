import { Component, inject, OnInit, signal } from '@angular/core';
import { Tours as ToursService } from '../../services/tours';
import { ITour, IToursResponse } from '../../models/tours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HighlightActive } from '../../shared/directives/highlight-active';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, MatButtonModule, DatePipe, HighlightActive], // импортируем класс директивы
  templateUrl: './tours.html',
  styleUrl: './tours.scss',
})
export class Tours implements OnInit {
  private toursService = inject(ToursService);
  private router = inject(Router);

  //tours = signal<ITour[]>([]);
  tours: ITour[] = [];

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data: IToursResponse) => {
      console.log('data tours', data.tours);
      // this.tours.set(data.tours);
      this.tours = data.tours;

      console.log('this.tours', this.tours);
    });
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
}
