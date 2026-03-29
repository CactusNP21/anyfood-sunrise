import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, throwError, finalize } from 'rxjs';
import { AuthClient } from '../clients/auth.client';
import { LoadingService } from '../../../../core/services/loading.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { IUser } from '../../models/user.model';
import { ILoginRequest } from '../../models/login-request.model';
import { AUTH_LOADING_KEYS } from '../../constants/auth-loading-keys.constant';
import { IRegisterRequest } from '../../models/register-request.model';
import { ILoginResponse } from '../../models/login-response.model';


const ACCESS_TOKEN_KEY = 'anyfood_access_token';
const REFRESH_TOKEN_KEY = 'anyfood_refresh_token';
const USER_KEY = 'anyfood_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly client = inject(AuthClient);
  private readonly loading = inject(LoadingService);
  private readonly storage = inject(LocalStorageService);
  private readonly router = inject(Router);

  private readonly $currentUser = signal<IUser | null>(
    this.loadUserFromStorage()
  );
  private readonly $error = signal<string | null>(null);

  readonly currentUser = this.$currentUser.asReadonly();
  readonly error = this.$error.asReadonly();
  readonly isAuthenticated = computed(() => this.$currentUser() !== null);

  login(payload: ILoginRequest) {
    this.$error.set(null);
    this.loading.start(AUTH_LOADING_KEYS.login);

    return this.client.login(payload).pipe(
      tap((res) => this.handleSuccess(res)),
      catchError((err) => {
        this.$error.set(err.error?.message ?? 'Невірний email або пароль');
        return throwError(() => err);
      }),
      finalize(() => this.loading.stop(AUTH_LOADING_KEYS.login))
    );
  }

  register(payload: IRegisterRequest) {
    this.$error.set(null);
    this.loading.start(AUTH_LOADING_KEYS.register);

    return this.client.register(payload).pipe(
      tap((res) => this.handleSuccess(res)),
      catchError((err) => {
        this.$error.set(err.error?.message ?? 'Помилка реєстрації');
        return throwError(() => err);
      }),
      finalize(() => this.loading.stop(AUTH_LOADING_KEYS.register))
    );
  }

  logout() {
    this.storage.remove(ACCESS_TOKEN_KEY);
    this.storage.remove(REFRESH_TOKEN_KEY);
    this.storage.remove(USER_KEY);
    this.$currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null {
    return this.storage.get(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.storage.get(REFRESH_TOKEN_KEY);
  }

  refresh(refreshToken: string) {
    return this.client.refresh(refreshToken).pipe(
      tap((res) => {
        this.storage.set(ACCESS_TOKEN_KEY, res.accessToken);
        this.storage.set(REFRESH_TOKEN_KEY, res.refreshToken);
      })
    );
  }

  clearError() {
    this.$error.set(null);
  }

  private handleSuccess(res: ILoginResponse) {
    this.storage.set(ACCESS_TOKEN_KEY, res.accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, res.refreshToken);
    this.storage.set(USER_KEY, JSON.stringify(res.user));
    this.$currentUser.set(res.user);
    this.loading.stop(AUTH_LOADING_KEYS.login);
    this.router.navigate(['/home']);
  }

  private loadUserFromStorage(): IUser | null {
    try {
      const raw = this.storage.get(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
