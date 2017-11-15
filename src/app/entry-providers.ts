import { Observable } from 'rxjs/Observable';
import { Entry } from './entry';

export class ProviderConfig {
  name: string;
  endpoint: string;
  type: string;
}

export interface EntryProvider {
  getEntries(): Observable<Entry[]>;
  getEntry(id: string): Observable<Entry>;
  search(term: string): Observable<Entry[]>;

  getConfig(): ProviderConfig;
  setConfig(config: ProviderConfig): void;
}
