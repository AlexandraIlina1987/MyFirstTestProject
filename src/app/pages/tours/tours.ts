import { Component, inject, OnInit, signal } from '@angular/core';
import { Tours as ToursService } from '../../services/tours';
import { ITour, IToursResponse } from '../../models/tours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './tours.html',
  styleUrl: './tours.scss',
})
export class Tours implements OnInit {
  private toursService = inject(ToursService);

  tours = signal<ITour[]>([]);

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data: IToursResponse) => {
      console.log('data tours', data.tours);
      this.tours.set(data.tours);
      console.log('this.tours', this.tours);
    });
  }
}
