import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Okta as OktaService } from '../okta';
import { OktaUser } from '../okta.types';
import { GroupPanel } from './group-panel/group-panel';

@Component({
  selector: 'app-user-groups',
  imports: [GroupPanel],
  templateUrl: './user-groups.html',
})
export class UserGroups {
  private readonly oktaService = inject(OktaService);

  user = input.required<OktaUser>();

  // The input is a signal, so changing the user reloads the groups.
  groupsResource = rxResource({
    params: () => this.user().id,
    stream: ({ params: userId }) => this.oktaService.groups(userId),
    defaultValue: [],
  });

  groupCount = computed(() => this.groupsResource.value().length);
  displayGroups = computed(() => this.groupsResource.value().slice(0, 3));
}
