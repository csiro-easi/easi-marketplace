import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Entry } from '../entry';
import { EntryService } from '../entry.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  @Input() entry: Entry;

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
                  this.entryService.getEntry(+params.get('id')))
      )
      .subscribe(entry => this.entry = entry);
  }

  goBack(): void {
    this.location.back();
  }
}
