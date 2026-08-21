import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { DPoPHeaders } from '@okta/okta-auth-js';
import { defer, map, switchMap } from 'rxjs';

export const oktaAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const oktaAuth = inject(OKTA_AUTH);
  const orgUrl = new URL(oktaAuth.options.issuer!).origin;

  // Only attach credentials to Okta org requests so they never leak to other hosts.
  if (!req.url.startsWith(orgUrl)) {
    return next(req);
  }

  const url = new URL(req.url);

  // The DPoP proof is bound to this exact method and URL. `htu` excludes the
  // query string, so sign origin + pathname only.
  return defer(() =>
    oktaAuth.getDPoPAuthorizationHeaders({
      url: `${url.origin}${url.pathname}`,
      method: req.method,
    })
  ).pipe(
    map((dpop: DPoPHeaders) => req.clone({ setHeaders: { ...dpop } })),
    switchMap((request) => next(request))
  );
};
