import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import { EntryService } from '../entry.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-entry-search',
  templateUrl: './entry-search.component.html',
  styleUrls: ['./entry-search.component.css']
})
export class EntrySearchComponent implements OnInit {
  entries: Observable<Entry[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private entryService: EntryService,
    private router: Router
  ) {}

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.entries = this.searchTerms
      .pipe(
        debounceTime(300),      // wait 300ms after each keystroke before searching
        distinctUntilChanged(), // ignore if search term has not changed
        switchMap(
          (term: string) => term // switch to new observable each time term changes
          // return the http search observable
            ? this.entryService.search(term)
          // or the observable of empty entries if no search term
            : observableOf<Entry[]>([])),
        catchError(error => {
          // TODO: add real error handling
          console.log(error);
          return observableOf<Entry[]>([]);
        }));
  }

}
