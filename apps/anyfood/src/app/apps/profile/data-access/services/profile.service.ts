import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { UsersClient } from '../clients/users.client';
import { IUserProfile } from '../../models/user-profile.model';
import { PROFILE_LOADING_KEYS } from '../../constants/profile-loading-keys.constant';
import { LoadingService } from '../../../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly client = inject(UsersClient);
  private readonly loading = inject(LoadingService);

  private readonly $profile = signal<IUserProfile | null>(null);
  private readonly $error = signal<string | null>(null);

  readonly profile = this.$profile.asReadonly();
  readonly error = this.$error.asReadonly();

  loadProfile() {
    return this.client.getMe().pipe(
      tap((profile) => this.$profile.set(profile)),
      catchError((err) => {
        this.$error.set(err.error?.message ?? 'Помилка завантаження профілю');
        return throwError(() => err);
      }),
      finalize(() => this.loading.stop(PROFILE_LOADING_KEYS.loadProfile))
    );
  }
}
