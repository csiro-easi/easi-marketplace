import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Entry } from './entry';

@Injectable()
export class EntryService {
  private entriesUrl = 'api/entries';

  constructor(private http: HttpClient) {}

  getEntries(): Promise<Entry[]> {
    return this.http
      .get<Entry[]>(this.entriesUrl)
      .toPromise()
      .catch(this.handleError);
  }

  search(term: string): Observable<Entry[]> {
    return this.http
      .get<Entry[]>(`${this.entriesUrl}/?name=${term}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error in EntryService', error);
    return Promise.reject(error.message || error);
  }
}
