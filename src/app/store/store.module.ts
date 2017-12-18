import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCardModule,
         MatCheckboxModule,
         MatGridListModule,
         MatSidenavModule
       } from '@angular/material';

import { LinkyModule } from 'angular-linky';

import { StoreComponent } from './store.component';
import { StoreService } from './store.service';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListingComponent } from './entry-listing/entry-listing.component';
import { QueryResultsComponent } from './query-results/query-results.component';
import { QueryComponent } from './query/query.component';
import { StoreHomeComponent } from './store-home.component';
import { StoreRoutingModule } from './store-routing.module';
import { EntryDependencyComponent } from './entry-dependency.component';
import { EntryVariableComponent } from './entry-variable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSidenavModule,
    LinkyModule
  ],
  exports: [StoreComponent],
  declarations: [
    EntryDetailComponent,
    EntryListingComponent,
    QueryResultsComponent,
    QueryComponent,
    StoreComponent,
    StoreHomeComponent,
    EntryDependencyComponent,
    EntryVariableComponent
  ],
  providers: [StoreService]
})
export class StoreModule { }
