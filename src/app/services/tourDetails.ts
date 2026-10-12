import { inject, Injectable } from '@angular/core';
import { TourDetailsApi } from './api/tourDetails-api';

@Injectable({
  providedIn: 'root',
})
export class TourDetails {
  private tourDetailsApi = inject(TourDetailsApi);

  getTour(cardId: string) {
    return this.tourDetailsApi.getDetails(cardId);
  }
}
