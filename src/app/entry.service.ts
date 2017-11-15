import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, reduce, switchMap, take, zip } from 'rxjs/operators';
import { from as observableFrom } from 'rxjs/observable/from';
import { of as observableOf } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';

import { PROVIDER_CONFIG } from './app.config';

import { Entry } from './entry';
import { EntryProvider, ProviderConfig } from './entry-providers';

import { SsscProvider } from './sssc/sssc-provider';

@Injectable()
export class EntryService {
  private entriesUrl = 'api/entries';
  private providers: EntryProvider[] = [];

  private cache: Entry[] = [];

  constructor(
    @Inject(PROVIDER_CONFIG) private providerConfigs: ProviderConfig[],
    private http: HttpClient
  ) {
    this.providers = providerConfigs
      .map(config => this.createProvider(config))
      .filter(it => it !== null);
  }

  getEntries(): Observable<Entry[]> {
    return this.providers[0].getEntries().pipe(
      map((entries) => {
        this.cache = [];
        entries.forEach((entry, i) => {
          entry.id = i;
          this.cache[i] = entry;
        });
        return entries;
      })
    );
  }

  getEntry(id: number): Observable<Entry> {
    // Call back to the provider to make sure we have up to date info.
    const entry_id = this.cache[id].url;
    return this.providers[0].getEntry(entry_id).pipe(
      map(entry => {
        entry.id = id;
        this.cache[id] = entry;
        return entry;
      })
    );
  }

  search(term: string): Observable<Entry[]> {
    return this.providers[0].search(term).pipe(
      map((entries) => {
        this.cache = [];
        entries.forEach((entry, i) => {
          entry.id = i;
          this.cache[i] = entry;
        });
        return entries;
      })
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error in EntryService', error);
    return observableOf<string>(error.message || error);
  }

  private createProvider(config: ProviderConfig) {
    let provider = null;
    switch (config.type) {
    case "sssc":
      provider = new SsscProvider(this.http, config);
      break;
    default:
      console.error(`Unknown entry provider type for '${config.name}': ${config.type}`);
    }
    return provider;
  }
}
