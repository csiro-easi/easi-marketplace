import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Entry } from './entry';
import { QueryComponent } from './query/query.component';
import { QueryResultsComponent } from './query-results/query-results.component';
import { SearchConstraints } from './entry-providers';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent implements OnInit {
  entries: Observable<Entry[]>;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.entries = this.storeService.getEntries();
  }

  query(constraints: SearchConstraints): void {
    this.storeService.query(constraints);
  }

}
