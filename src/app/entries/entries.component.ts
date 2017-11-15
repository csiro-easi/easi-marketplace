import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs/Observable';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import { Entry }        from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  cols = 4;
  entries: Observable<Entry[]>;
  private searchTerms = new BehaviorSubject<string>('');

  constructor(private entryService: EntryService) {}

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
          // switch to new observable each time term changes
          (term: string) => term
          // return the http search observable
            ? this.entryService.search(term)
          // or the observable of all entries if no search term
            : this.entryService.getEntries()),
      catchError(error => {
        // TODO: add real error handling
        console.log(error);
        return observableOf<Entry[]>([]);
      }));
  }
}
