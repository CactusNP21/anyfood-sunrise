import { Injectable, inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { PROFILE_LOADING_KEYS } from '../../constants/profile-loading-keys.constant';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  private readonly profileService = inject(ProfileService);
  private readonly loading = inject(LoadingService);

  readonly profile = this.profileService.profile;
  readonly error = this.profileService.error;
  readonly $isLoading = this.loading.isLoading(
    PROFILE_LOADING_KEYS.loadProfile
  );

  loadProfile() {
    return this.profileService.loadProfile();
  }
}
