import { Injectable, inject } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading.service';
import { AuthService } from '../services/auth.service';
import { AUTH_LOADING_KEYS } from '../../constants/auth-loading-keys.constant';
import { ILoginRequest } from '../../models/login-request.model';
import { IRegisterRequest } from '../../models/register-request.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly authService = inject(AuthService);
  private readonly loading = inject(LoadingService);

  readonly currentUser = this.authService.currentUser;
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly error = this.authService.error;

  readonly $isLoginLoading = this.loading.isLoading(AUTH_LOADING_KEYS.login);
  readonly $isRegisterLoading = this.loading.isLoading(
    AUTH_LOADING_KEYS.register
  );

  login(payload: ILoginRequest) {
    return this.authService.login(payload);
  }

  register(payload: IRegisterRequest) {
    return this.authService.register(payload);
  }

  logout() {
    this.authService.logout();
  }

  clearError() {
    this.authService.clearError();
  }
}
