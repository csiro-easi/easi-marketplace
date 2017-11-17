import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap, pluck, reduce } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Entry } from '../entry';
import { SearchConstraints, EntryProvider, EntryType, ProviderConfig } from '../entry-providers';

interface SSSCEntry {
  '@id': string;
  '@type': EntryType;
  name: string;
  description: string;
  created_at: Date;
}

interface SolutionsResponse {
  solutions: SSSCEntry[];
}

interface SearchResponse {
  problems: SSSCEntry[];
  toolboxes: SSSCEntry[];
  solutions: SSSCEntry[];
}

@Injectable()
export class SsscProvider implements EntryProvider {
  constructor(
    private http: HttpClient,
    private config?: ProviderConfig
  ) {}

  getConfig(): ProviderConfig {
    return this.config;
  }

  setConfig(config: ProviderConfig): void {
    this.config = config;
  }

  getEntries(constraints?: SearchConstraints): Observable<Entry[]> {
    let requests = [];
    switch (constraints.category) {
    case EntryType.Problem:
      requests = [this.request('problems')];
      break;
    case EntryType.Toolbox:
      requests = [this.request('toolboxes')];
      break;
    case EntryType.Solution:
      requests = [this.request('solutions')];
      break;
    default:
      requests = [this.request('problems'),
                  this.request('toolboxes'),
                  this.request('solutions')];
    }
    return forkJoin(requests).pipe(
      // Aggregate responses into a single SearchResponse before mapping to
      // Entries.
      map((resps) => Object.assign({}, ...resps)),
      map(this.toEntries()),
      catchError(this.handleError([]))
    );
  }

  getEntry(id: string): Observable<Entry> {
    return this.http
      .get<SSSCEntry>(id)
      .pipe(
        map(this.toEntry),
        catchError(this.handleError(null))
      );
  }

  search(term: string, constraints?: SearchConstraints): Observable<Entry[]> {
    return this.http
      .get<SearchResponse>(`${this.config.endpoint}/search?search=${term}`)
      .pipe(
        map(this.toEntries(constraints.category)),
        catchError(this.handleError([]))
      );
  }

  toEntry(entry: SSSCEntry): Entry {
    return {
      id: null,
      entryType: entry['@type'],
      name: entry.name,
      description: entry.description,
      url: entry['@id'],
      icon: null
    };
  }

  private toEntries(category?: EntryType): ((resp) => Entry[]) {
    return ((resp) => {
      let entries;
      const problems = resp.problems || [];
      const toolboxes = resp.toolboxes || [];
      const solutions = resp.solutions || [];

      switch (category) {
      case EntryType.Solution:
        entries = solutions;
        break;
      case EntryType.Toolbox:
        entries = toolboxes;
        break;
      case EntryType.Problem:
        entries = problems;
        break;
      default:
        // Return all categories
        entries = solutions.concat(toolboxes).concat(problems);
      }

      return entries.map(this.toEntry);
    });
  }

  private request(category: string) {
    return this.http.get<SearchResponse>(`${this.config.endpoint}/${category}/`);
  }

  private handleError<T>(val: T): ((T) => Observable<T>) {
    return error => {
      console.error('Error in sssc.service', error);
      return observableOf<T>(val);
    };
  }
}
