import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister, IRegisterResponse } from '../../models/auth';
import { Loader } from '../loader';
import { delay, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApi {
  private api = API;
  private http = inject(HttpClient);
  private loaderService = inject(Loader);

  register(body: IRegister): Observable<IRegisterResponse> {
    this.loaderService.setLoader(true);
    return this.http.post<IRegisterResponse>(this.api.register, body).pipe(
      delay(1000),
      finalize(() => {
        this.loaderService.setLoader(false);
      }),
    );
  }
}
