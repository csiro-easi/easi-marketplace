import { Observable } from 'rxjs/Observable';
import { Entry } from './entry';

export class ProviderConfig {
  name: string;
  endpoint: string;
  type: string;
}

export enum EntryType {
  Solution = "Solution",
  Toolbox = "Toolbox",
  Problem = "Problem"
}

export interface SearchConstraints {
  category?: EntryType;
}

export interface EntryProvider {
  getEntries(constraints?: SearchConstraints): Observable<Entry[]>;
  getEntry(id: string): Observable<Entry>;
  search(term: string, constraints?: SearchConstraints): Observable<Entry[]>;

  getConfig(): ProviderConfig;
  setConfig(config: ProviderConfig): void;
}
