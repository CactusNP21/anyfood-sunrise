import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../data-access/facades/auth.facade';
import { LoadingService } from '../../../../../core/services/loading.service';
import { AUTH_LOADING_KEYS } from '../../../constants/auth-loading-keys.constant';
import { IRegisterRequest } from '../../../models/register-request.model';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  if (password && confirm && password !== confirm) {
    control.get('confirmPassword')?.setErrors({ mismatch: true });
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormField],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(AuthFacade);
  private readonly loading = inject(LoadingService);

  readonly $showPassword = signal(false);
  readonly $showConfirm = signal(false);
  readonly $submitted = signal(false);
  readonly $isLoading = this.loading.isLoading(AUTH_LOADING_KEYS.register);

  readonly error = this.facade.error;

  $registerFormModel = signal<IRegisterRequest>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  form = form(this.$registerFormModel, (form) => {
    required(form.name);
    required(form.username);
    required(form.email);
    required(form.password);
    required(form.confirmPassword);

    email(form.email);

    minLength(form.name, 2);
    minLength(form.username, 3);
    minLength(form.password, 8);

    // pattern(form.password)
  });

  readonly perks = [
    {
      icon: '📖',
      title: 'Необмежені рецепти',
      description: 'Зберігайте та організовуйте всі свої страви',
    },
    {
      icon: '🛒',
      title: 'Розумний список покупок',
      description: 'Автоматична генерація з рецептів тижня',
    },
    {
      icon: '📊',
      title: 'Контроль харчування',
      description: 'КБЖУ для кожного рецепту і дня',
    },
    {
      icon: '📅',
      title: 'Планувальник меню',
      description: 'Плануйте харчування на весь тиждень',
    },
  ];

  ngOnInit() {
    this.facade.clearError();
  }

  getPasswordStrength(): { level: number; label: string; color: string } {
    const formState = this.form();

    const val = this.form.password().value() ?? '';
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Слабкий', color: 'bg-red-400' },
      { level: 2, label: 'Середній', color: 'bg-yellow-400' },
      { level: 3, label: 'Добрий', color: 'bg-blue-400' },
      { level: 4, label: 'Сильний', color: 'bg-green-500' },
    ];
    return levels[score];
  }

  onSubmit() {
    this.$submitted.set(true);

    const formState = this.form();
    if (formState.invalid()) return;


    this.facade.register(formState.value()).subscribe();
  }
}
