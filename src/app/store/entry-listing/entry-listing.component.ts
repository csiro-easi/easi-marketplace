import { Component, Input, OnInit } from '@angular/core';

import { Entry } from '../entry';

@Component({
  selector: 'app-entry-listing',
  templateUrl: './entry-listing.component.html',
  styleUrls: ['./entry-listing.component.css']
})
export class EntryListingComponent implements OnInit {
  @Input() entry: Entry;

  constructor() {}

  ngOnInit(): void {}

}
