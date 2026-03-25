import { Component, inject, OnInit } from '@angular/core';
import { ProfileFacade } from '../data-access/facades/profile.facade';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  readonly facade = inject(ProfileFacade);

  ngOnInit() {
    this.facade.loadProfile().subscribe();
  }
}
