import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { IAuth, IAuthResponse } from '../../models/auth';
import { Loader } from '../loader';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private api = API;
  private http = inject(HttpClient);
  private loaderService = inject(Loader);

  auth(body: IAuth): Observable<IAuthResponse> {
    this.loaderService.setLoader(true);
    return this.http.post<IAuthResponse>(this.api.auth, body).pipe(
      delay(1000),
      finalize(() => {
        this.loaderService.setLoader(false);
      }),
    );
  }
}
