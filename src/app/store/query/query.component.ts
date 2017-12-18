import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EntryType, ENTRY_TYPES } from '../entry';
import { SearchConstraints } from '../entry-providers';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  @Output() onUpdate = new EventEmitter<SearchConstraints>();

  private categorySelection: [EntryType, boolean][] = ENTRY_TYPES.map<[EntryType, boolean]>(x => [x, true]);

  private searchTerm  = '';

  constructor() {
  }

  search(term: string): void {
    this.searchTerm = term;
    this.emitUpdate();
  }

  categoryChanged(event): void {
    this.emitUpdate();
  }

  getSelectedCategories(): EntryType[] {
    return this.categorySelection.filter(kv => kv[1]).map(kv => kv[0]);
  }

  getSearchTerm(): string {
    const term = this.searchTerm.trim();
    return term.length > 0 ? term : null;
  }

  emitUpdate(): void {
    const constraints = {
      categories: this.getSelectedCategories(),
      term: this.getSearchTerm()
    };
    this.onUpdate.emit(constraints);
  }

  ngOnInit() {
    this.emitUpdate();
  }
}
