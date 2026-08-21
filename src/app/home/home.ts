import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink],
  template: `
    <div class="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <h1 class="mb-2 text-center text-2xl font-bold text-gray-900">Welcome</h1>

      @if (isAuthenticated$ | async) {
        <p class="mb-8 text-center text-sm text-gray-500">You're signed in.</p>
        <a
          routerLink="/dashboard"
          class="block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go to your dashboard
        </a>
      } @else {
        <p class="text-center text-sm text-gray-500">
          Use the Sign in button above to access your dashboard.
        </p>
      }
    </div>
  `,
})
export class Home {
  isAuthenticated$ = inject(OktaAuthStateService).authState$.pipe(
    map((authState) => authState.isAuthenticated ?? false)
  );
}
