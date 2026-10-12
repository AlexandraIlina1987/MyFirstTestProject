import { inject, Injectable } from '@angular/core';
import { ITour } from '../../models/tours';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TourDetailsApi {
  private api = API;
  private http = inject(HttpClient);

  getDetails(cardId: string) {
    return this.http.get<ITour>(`${this.api.tourDetails}/${cardId}`);
  }
}
