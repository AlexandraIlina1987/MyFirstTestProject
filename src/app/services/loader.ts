import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  private loaderSubject = new Subject<boolean>();
  readonly loader$ = this.loaderSubject.asObservable();

  setLoader(val: boolean) {
    this.loaderSubject.next(val);
  }
}
