import { Component, input } from '@angular/core';

@Component({
  selector: 'app-group-panel',
  template: `
    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 class="mb-1 text-base font-semibold text-gray-800">{{ heading() }}</h3>
      <p class="text-sm text-gray-600">{{ description() }}</p>
    </div>
  `,
})
export class GroupPanel {
  heading = input.required<string>();
  description = input<string>('');
}
