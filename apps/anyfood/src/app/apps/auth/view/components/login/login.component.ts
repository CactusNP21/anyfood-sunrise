import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../data-access/facades/auth.facade';
import { LoadingService } from '../../../../../core/services/loading.service';
import { AUTH_LOADING_KEYS } from '../../../constants/auth-loading-keys.constant';
import { ILoginRequest } from '../../../models/login-request.model';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { AnyfoodInputComponent } from '@anyfood/ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormField, AnyfoodInputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly facade = inject(AuthFacade);
  private readonly loading = inject(LoadingService);
  private readonly router = inject(Router);

  readonly $showPassword = signal(false);
  readonly $submitted = signal(false);
  readonly $isLoading = this.loading.isLoading(AUTH_LOADING_KEYS.login);

  readonly error = this.facade.error;

  $loginFormModel = signal<ILoginRequest>({
    username: '',
    password: '',
  });

  readonly form = form(this.$loginFormModel, (form) => {
    required(form.username);
    minLength(form.username, 2)
    required(form.password);
  });

  ngOnInit() {
    // this.facade.clearError();
    // console.login(this.form.username());
  }

  onSubmit() {
    this.form.username().markAsTouched();
    const formState = this.form();
    if (formState.invalid()) return;

    this.facade.login(formState.value()).subscribe();
  }

  togglePassword() {
    this.$showPassword.update((v) => !v);
  }
}
