import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../data-access/facades/auth.facade';
import { LoadingService } from '../../../../../core/services/loading.service';
import { AUTH_LOADING_KEYS } from '../../../constants/auth-loading-keys.constant';
import { ILoginRequest } from '../../../models/login-request.model';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormField],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(AuthFacade);
  private readonly loading = inject(LoadingService);

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
    required(form.password);
  });

  ngOnInit() {
    this.facade.clearError();
  }

  onSubmit() {
    this.$submitted.set(true);
    const formState = this.form();
    if (formState.invalid()) return;

    this.facade.login(formState.value()).subscribe();
  }

  togglePassword() {
    this.$showPassword.update((v) => !v);
  }
}
