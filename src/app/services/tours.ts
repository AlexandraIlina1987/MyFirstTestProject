import { inject, Injectable } from '@angular/core';
import { TourApi } from './api/tour-api';
@Injectable({
  providedIn: 'root',
})
export class Tours {
  private toursApi = inject(TourApi);

  getTours() {
    return this.toursApi.getTours();
  }
}
