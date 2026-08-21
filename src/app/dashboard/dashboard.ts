import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Okta } from '../okta';
import { UserGroups } from '../user-groups/user-groups';

@Component({
  selector: 'app-dashboard',
  imports: [UserGroups],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly okta = inject(Okta);

  selectedUserId = signal<string | undefined>(undefined);

  usersResource = rxResource({
    stream: () => this.okta.users(),
    defaultValue: [],
  });

  selectUser(userId: string): void {
    this.selectedUserId.update((current) => (current === userId ? undefined : userId));
  }

  statusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'SUSPENDED':
      case 'LOCKED_OUT':
      case 'DEPROVISIONED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
