import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import { ButtonDirective } from './shared/directives/button.directive';
import { BottomMobileNavigationComponent } from './layout/buttom-mobile-navigation/bottom-mobile-navigation.component';

@Component({
  imports: [RouterModule, HeaderComponent, BottomMobileNavigationComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'anyfood';
}
