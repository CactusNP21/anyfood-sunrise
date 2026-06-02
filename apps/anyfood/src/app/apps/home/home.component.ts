import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DishComponent } from '../../shared/dish/dish.component';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly steps = [
    {
      step: 1,
      icon: '🥦',
      title: 'Продукти',
      description: 'Додайте продукти з нутрієнтами та цінами до вашого глосарію',
    },
    {
      step: 2,
      icon: '📖',
      title: 'Рецепти',
      description: 'Створюйте рецепти з ваших продуктів — КБЖУ розраховується автоматично',
    },
    {
      step: 3,
      icon: '📅',
      title: 'План',
      description: 'Складіть план харчування на день або тиждень із ваших рецептів',
    },
    {
      step: 4,
      icon: '🛒',
      title: 'Покупки',
      description: 'Отримайте автоматичний список покупок з кількостями та цінами',
    },
  ];

  readonly features = [
    {
      icon: '📊',
      title: 'Контроль КБЖУ',
      description: 'Відстежуйте калорії, білки, жири та вуглеводи для кожного рецепту і дня автоматично.',
    },
    {
      icon: '📅',
      title: 'Планування тижня',
      description: 'Складайте збалансоване меню на тиждень та зберігайте улюблені плани.',
    },
    {
      icon: '🛒',
      title: 'Список покупок',
      description: 'Генеруйте точний список покупок із вашого плану — з вагою та вартістю кожного продукту.',
    },
    {
      icon: '🔒',
      title: 'Ваші дані — ваші',
      description: 'Продукти та рецепти, які ви створюєте, доступні лише вам.',
    },
    {
      icon: '⚡',
      title: 'Швидко і просто',
      description: 'Зручний інтерфейс без зайвого — від продукту до списку покупок у кілька кліків.',
    },
    {
      icon: '🍽',
      title: 'Системні продукти',
      description: 'База готових продуктів з нутрієнтами — не потрібно вводити все вручну.',
    },
  ];
}
