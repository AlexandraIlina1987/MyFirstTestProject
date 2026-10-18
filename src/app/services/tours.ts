import { inject, Injectable } from '@angular/core';
import { TourApi } from './api/tour-api';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITourTypes } from '../models/tours';
@Injectable({
  providedIn: 'root',
})
export class Tours {
  private toursApi = inject(TourApi);

  private tourTypeSubject = new BehaviorSubject<ITourTypes>('all'); // создаем subject для отправки типов туров
  readonly tourType$ = this.tourTypeSubject.asObservable(); // создаем observable для подписки на типы туров

  private tourDateSubject = new BehaviorSubject<Date | null>(null); // создаем subject для отправки дат туров
  readonly tourDate$ = this.tourDateSubject.asObservable(); // создаем observable для подписки на даты туров

  getTours() {
    return this.toursApi.getTours();
  }

  setTourType(type: ITourTypes) {
    this.tourTypeSubject.next(type);
  }

  setTourDate(date: Date | null) {
    this.tourDateSubject.next(date);
  }
}
