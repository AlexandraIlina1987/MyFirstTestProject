import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { IToursResponse } from '../../models/tours';
import { Loader } from '../loader';
import { delay, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourApi {
  private api = API;
  private http = inject(HttpClient);
  private loaderService = inject(Loader);

  getTours() {
    this.loaderService.setLoader(true);
    return this.http.get<IToursResponse>(`${this.api.tours}`).pipe(
      delay(3000),
      finalize(() => {
        this.loaderService.setLoader(false);
      }),
    );

    // return this.http.get(`src/app/shared/mocks/tours.json`); // mocks
    //return this.http.get<IToursResponse>(`tours.json`); // mocks
  }
}
