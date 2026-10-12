import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister, IRegisterResponse } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApi {
  private api = API;
  private http = inject(HttpClient);

  register(body: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(this.api.register, body);
  }
}
