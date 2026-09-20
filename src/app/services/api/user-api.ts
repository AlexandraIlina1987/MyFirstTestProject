import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuth, IAuthResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private api = API;
  private http = inject(HttpClient);

  auth(body: IAuth): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.api.auth, body);
  }
}
