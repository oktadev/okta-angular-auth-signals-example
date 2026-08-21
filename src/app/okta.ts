import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaGroup, OktaUser } from './okta.types';

@Service()
export class Okta {
  private readonly http = inject(HttpClient);

  // The Okta management API lives on the org domain, which the issuer points at.
  private readonly orgUrl = new URL(inject(OKTA_AUTH).options.issuer!).origin;

  users() {
    return this.http.get<OktaUser[]>(`${this.orgUrl}/api/v1/users`);
  }

  groups(userId: string) {
    return this.http.get<OktaGroup[]>(`${this.orgUrl}/api/v1/users/${userId}/groups`);
  }
}
