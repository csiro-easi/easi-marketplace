import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-dependency',
  template: `
    <ul>
      <li *ngFor="let dep of dependencies">
        <span [innerHTML]="dep['identifier'] | linky"></span> <span class="dep-metadata">(type: {{dep['type']}}<span *ngIf="dep['version']">, version: {{dep['version']}}</span>)</span>
      </li>
    </ul>
  `,
  styles: [
    '.dep-metadata { font-style: italic; }'
  ]
})
export class EntryDependencyComponent implements OnInit {
  @Input() dependencies: object[];

  constructor() { }

  ngOnInit() {
  }

}
