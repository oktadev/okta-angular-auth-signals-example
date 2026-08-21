import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  isAuthenticated$ = this.oktaStateService.authState$.pipe(
    map((authState) => authState.isAuthenticated ?? false)
  );

  // The `profile` scope puts the display name in the ID token, so no extra request.
  userName$ = this.oktaStateService.authState$.pipe(
    map((authState) => authState.idToken?.claims.name)
  );

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect({ originalUri: '/dashboard' });
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
