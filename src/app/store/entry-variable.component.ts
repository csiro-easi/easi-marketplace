import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-variable',
  template: `
    <dl>
      <div *ngFor="let variable of variables">
        <dt>{{variable['label']}} <span class="var-type">({{variable['type']}}<span *ngIf="variable['optional']">, optional</span>)</span></dt>
        <dd [innerHTML]="variable['description'] | linky"></dd>
      </div>
    </dl>
  `,
  styles: [
    'dt { font-weight: bold; } .var-type { font-style: italic; }'
  ]
})
export class EntryVariableComponent implements OnInit {
  @Input() variables: object[];

  constructor() { }

  ngOnInit() {
  }

}
