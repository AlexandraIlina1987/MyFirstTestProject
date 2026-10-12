import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { IToursResponse } from '../../models/tours';

@Injectable({
  providedIn: 'root',
})
export class TourApi {
  private api = API;
  private http = inject(HttpClient);

  getTours() {
    //return this.http.get(`${this.api.tours}`);
    // return this.http.get(`src/app/shared/mocks/tours.json`); // mocks
    return this.http.get<IToursResponse>(`tours.json`); // mocks
  }
}
