import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApi {
  private api = API;
  private http = inject(HttpClient);

  register(body: IRegister): Observable<any> {
    // спросить на уроке про этот any
    return this.http.post<any>(this.api.register, body);
  }
}
