import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, pluck } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import { Entry } from '../entry';
import { EntryProvider, ProviderConfig } from '../entry-providers';

enum EntryType {
  Solution = "Solution",
  Toolbox = "Toolbox",
  Problem = "Problem"
}

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

  getEntries(): Observable<Entry[]> {
    return this.http
      .get<SolutionsResponse>(`${this.config.endpoint}/solutions/`)
      .pipe(
        map(resp => resp.solutions.map(this.toEntry)),
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

  search(term: string): Observable<Entry[]> {
    return this.http
      .get<SolutionsResponse>(`${this.config.endpoint}/search?search=${term}`)
      .pipe(
        map(resp => resp.solutions.map(this.toEntry)),
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

  private handleError<T>(val: T): ((T) => Observable<T>) {
    return error => {
      console.error('Error in sssc.service', error);
      return observableOf<T>(val);
    };
  }
}
