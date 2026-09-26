import { Component, inject, OnInit, signal } from '@angular/core';
import { Tours as ToursService } from '../../services/tours';
import { ITour, IToursResponse } from '../../models/tours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, MatButtonModule],
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

  goToTour(tour: any) {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`]);
    }
  }
}
