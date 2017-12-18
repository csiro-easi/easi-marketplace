import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Entry } from '../entry';

@Component({
  selector: 'app-query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.css']
})
export class QueryResultsComponent implements OnInit {
  @Input() entries: Observable<Entry[]>;

  cols = 4;
  rowHeight = '4:3';

  constructor() { }

  ngOnInit() {
  }

}
