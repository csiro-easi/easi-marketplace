import { Observable } from 'rxjs/Observable';
import { Entry, Problem, Toolbox, Solution, Application, EntryType } from './entry';

export interface SearchConstraints {
  categories?: EntryType[];
  term?: string;
}

export class SearchResponse {
  problems?: Problem[];
  toolboxes?: Toolbox[];
  solutions?: Solution[];
  applications?: Application[];
  error?: string;
}
