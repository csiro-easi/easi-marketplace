import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import { Entry } from './entry';
import { SearchConstraints } from './entry-providers';
import { StoreService } from './store.service';

@Component({
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  // Current query results
  private entries: Observable<Entry[]>;

  // Constraints
  private constraints: SearchConstraints = {};

  // Configuration of the UI
  private queryNavMode = 'side';
  private queryNavOpened = true;

  /**
   * Create a new instance with the injected StoreService.
   *
   * @param {StoreService} storeService - The injected StoreService.
   */
  constructor(private storeService: StoreService) {}

  ngOnInit() {}
}
