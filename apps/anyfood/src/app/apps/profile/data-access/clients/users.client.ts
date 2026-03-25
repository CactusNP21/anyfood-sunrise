import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviroments/enviroments';
import { IUserProfile } from '../../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UsersClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  getMe() {
    return this.http.get<IUserProfile>(`${this.baseUrl}/self`);
  }
}
