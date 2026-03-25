import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviroments/enviroments';
import { ILoginRequest } from '../../models/login-request.model';
import { ILoginResponse } from '../../models/login-response.model';
import { IRegisterRequest } from '../../models/register-request.model';


@Injectable({ providedIn: 'root' })
export class AuthClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  login(payload: ILoginRequest) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, payload);
  }

  register(payload: IRegisterRequest) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/register`, payload);
  }

  refresh(refreshToken: string) {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/refresh`, {
      refreshToken,
    });
  }
}
