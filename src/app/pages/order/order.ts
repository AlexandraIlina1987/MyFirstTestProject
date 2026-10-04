import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourDetails } from '../../services/tourDetails';
import { IOrder, ITour } from '../../models/tours';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order implements OnInit {
  //private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tourDetails = inject(TourDetails);
  tour: ITour | null = null;
  lastName = '';
  firstName = '';
  email = '';
  order: IOrder | null = null;

  onOrder(form: NgForm): void {
    if (form.invalid || !this.tour || !this.lastName.trim() || !this.firstName.trim()) {
      return;
    }

    this.order = {
      tourId: this.tour.id,
      lastName: this.lastName.trim(),
      firstName: this.firstName.trim(),
      email: this.email.trim(),
    };
  }

  ngOnInit(): void {
    console.log('order init');
    const tourId = this.route.snapshot.paramMap.get('tourId') || '';
    if (!tourId) {
      return;
    }
    this.tourDetails.getTour(tourId).subscribe((data) => {
      console.log('tour data order', data);
      this.tour = data;
    });
  }
}
