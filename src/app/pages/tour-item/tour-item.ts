import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TourDetails } from '../../services/tourDetails';
import { ITour } from '../../models/tours';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tour-item',
  imports: [RouterLink, DatePipe, MatButtonModule],
  templateUrl: './tour-item.html',
  styleUrl: './tour-item.scss',
})
export class TourItem implements OnInit {
  private route = inject(ActivatedRoute);
  private tourDetails = inject(TourDetails);
  private router = inject(Router);

  tour: ITour;
  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id') || '';
    if (!cardId) {
      return;
    }
    this.tourDetails.getTour(cardId).subscribe((data) => {
      //console.log('tour data', data);
      this.tour = data;
    });
  }
  // bookTour() {
  //  if (cardId) {
  //     this.router.navigate([`tour/${cardId}/order`]);
  //   }
  // }
}
