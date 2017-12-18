import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  reduce,
  switchMap,
  take,
  zip
} from 'rxjs/operators';

import { from as observableFrom } from 'rxjs/observable/from';
import { of as observableOf } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ProviderConfig, PROVIDER_CONFIG } from '../app.config';

import { Entry, EntryType } from './entry';
import { SearchConstraints, SearchResponse } from './entry-providers';

const entryTypesMap: { [ET in EntryType]: string } = {
  'Problem': 'problems',
  'Toolbox': 'toolboxes',
  'Solution': 'solutions',
  'Application': 'applications'
};

@Injectable()
export class StoreService {

  // Entries from the providers
  private entries$: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);

  // Current query constraints
  private query$: BehaviorSubject<SearchConstraints> = new BehaviorSubject<SearchConstraints>({});

  constructor(
    @Inject(PROVIDER_CONFIG) private providers: ProviderConfig[],
    private http: HttpClient
  ) {
    // Subscribe to the query stream to send each new query to the providers.
    this.query$.pipe(
      // wait 300ms after each change before searching
      debounceTime(300),

      // ignore if constraints have not changed
      distinctUntilChanged(),

      // return the http search observable
      switchMap(constraints => this.doQuery(constraints)),

      // errors that make it here are probably bad!
      catchError(error => {
        // TODO: add real error handling
        console.log('Error made it to store.component!');
        console.log(error);
        return observableOf<Entry[]>([]);
      })
    ).subscribe(this.entries$);
  }

  getEntries(): Observable<Entry[]> {
    return this.entries$;
  }

  getQuery(): Observable<SearchConstraints> {
    return this.query$;
  }

  query(constraints: SearchConstraints = {}): Observable<Entry[]> {
    console.log('query(' + JSON.stringify(constraints) + ')');
    this.query$.next(constraints);
    return this.getEntries();
  }

  getEntry(id: string): Observable<Entry> {
    console.log('getEntry(' + id + ')');
    // Try the cache first, then go to the provider
    return this.getEntries().pipe(switchMap(entries => this.lookupEntry(entries, id)));
  }

  private lookupEntry(entries: Entry[], id: string): Observable<Entry> {
    console.log('lookupEntry(' + entries.length + ', ' + id + ')');
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
      return observableOf<Entry>(entry);
    } else {
      return this.http.get<Entry>(id).pipe(
        map(this.fixEntryProps),
        catchError(this.handleError(null))
      );
    }
  }

  private fixEntryProps(entry: Entry): Entry {
    return {
      id: entry['@id'],
      entryType: entry['@type'],
      createdAt: entry['created_at'],
      ...entry
    };
  }

  private responseFilter(constraints: SearchConstraints = {}): (SearchResponse) => SearchResponse {
    return (resp: SearchResponse) => {
      // Filter entry type(s) here, since the text search is current over the
      // whole catalogue in the SSSC.
      const categories = (constraints.categories || []).map(c => entryTypesMap[c]);
      const includes = [...categories, 'error'];
      const copy = new SearchResponse();
      for (const p of includes) {
        copy[p] = resp[p];
      }
      return copy;
    };
  }

  private buildSSSCRequests(endpoint: string, constraints: SearchConstraints = {}): Observable<SearchResponse>[] {
    let requests = [];

    if (constraints.term) {
      requests = [
        this.http
          .get<SearchResponse>(`${endpoint}/search?search=${constraints.term}`)
      ];
    } else {
      const categories = constraints.categories ? constraints.categories.map(c => entryTypesMap[c]) : [];
      requests = categories.map(
        category => this.http.get<SearchResponse>(`${endpoint}/${category}/`)
      );
    }

    return requests.map(r => r.pipe(
      map(this.responseFilter(constraints)),
      catchError(this.handleError({}))
    ));
  }

  private doQuery(constraints: SearchConstraints): Observable<Entry[]> {
    console.log('doquery(' + JSON.stringify(constraints) + ')');
    const requests = [].concat(...this.providers.map(
      p => this.buildSSSCRequests(p.endpoint, constraints)
    ));

    return forkJoin(requests).pipe(
      map(resps => resps.map((cur: SearchResponse) => {
        let entries: Entry[] = [];
        if (cur.problems) {
          entries = entries.concat(cur.problems.map(this.fixEntryProps));
        }
        if (cur.toolboxes) {
          entries = entries.concat(cur.toolboxes.map(this.fixEntryProps));
        }
        if (cur.solutions) {
          entries = entries.concat(cur.solutions.map(this.fixEntryProps));
        }
        if (cur.applications) {
          entries = entries.concat(cur.applications.map(this.fixEntryProps));
        }
        return entries;
      })),
      map(entries => [].concat(...entries))
    );

  }

  private handleError<T>(val: T): ((any) => Observable<T>) {
    return error => {
      console.error('Error in entry.service', error);
      return observableOf<T>(val);
    };
  }
}
