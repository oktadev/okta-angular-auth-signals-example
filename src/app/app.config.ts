import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { provideOktaAuth, withOktaConfig } from '@okta/okta-angular';
import { oktaAuthInterceptor } from './okta-auth.interceptor';

import { routes } from './app.routes';

// Replace these with the values from your own Okta SPA application.
// Both are public values in a browser app — they ship in the bundle.
const oktaAuth = new OktaAuth({
  clientId: '{yourClientId}',
  issuer: 'https://{yourOktaDomain}',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email', 'okta.users.read'],
  pkce: true,
  dpop: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([oktaAuthInterceptor])),
    provideOktaAuth(
      withOktaConfig({
        oktaAuth
      })
    ),
  ],
};
