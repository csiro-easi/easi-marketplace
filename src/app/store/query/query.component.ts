import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EntryType, ENTRY_TYPES, Entry } from '../entry';
import { SearchConstraints } from '../entry-providers';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  @Output() onUpdate = new EventEmitter<SearchConstraints>();

  private searchTerm  = '';

  public solutionSelection: [Entry, boolean][]=[];

  constructor(private storeService: StoreService) {
  }

  search(term: string): void {
    this.searchTerm = term;
    this.emitUpdate();
  }

  categoryChanged(event): void {
    this.emitUpdate();
  }

  getSearchTerm(): string {
    const term = this.searchTerm.trim();
    return term.length > 0 ? term : null;
  }

  emitUpdate(): void {
    const constraints: SearchConstraints  = {
      categories: ['Application', 'Solution'],
      term: this.getSearchTerm()
    };
    this.onUpdate.emit(constraints);
  }

  ngOnInit() {
    // const constraints: SearchConstraints = {
    //   categories: ['Solution'],
    //   term: ''
    // };
    this.storeService.getEntries().subscribe((entries: Entry[]) => {
      for (let s of entries) {
        if (s.entryType == 'Solution') {
          this.solutionSelection.push([s, false])
        }
      }
    })
    this.emitUpdate();
  }
}
