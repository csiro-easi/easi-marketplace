import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';

import { Entry } from '../entry';
import { StoreService } from '../store.service';
import { slideInDownAnimation } from '../../animations';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

const properties = [
  'id',
  'name',
  'description',
  'author',
  'createdAt',
  'created_at',
  'icon',
  'published'
];


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class EntryDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  private entry$: Observable<Entry>;
  private entry: Entry;

  private dateFormat = 'long';

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.entry$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
                this.storeService.getEntry(params.get('id')))
    );

    this.entry$.subscribe(entry => this.entry = entry);
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private getProperties(entry) {
    return Object.keys(entry).filter(k => {
      return (!properties.includes(k) &&
              !k.startsWith('@') &&
              !k.endsWith('_hash'));
    });
  }

  private propertyType(p) {
    const t = typeof(p);

    // Distinguish different object types
    if (t === 'object') {
      if (Array.isArray(p)) {
        // Test type of contents
        if (p[0]) {
          const ptype = p[0]['@type'];
          if (ptype === 'SolutionVar') {
            return 'variables';
          } else if (ptype === 'SolutionDependency') {
            return 'dependencies';
          }
        }
        return 'array';
      } else if (p['@type']) {
        return p['@type'];
      }
    }

    return t;
  }
}
