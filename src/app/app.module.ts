import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Required for angular/material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatCardModule,
         MatGridListModule }       from '@angular/material';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryService } from './entry.service';
import { ProviderConfig } from './entry-providers';
import { AVRE_PROVIDER_CONFIG, PROVIDER_CONFIG } from './app.config';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SsscModule } from './sssc/sssc.module';
import { EntryListingComponent } from './entry-listing/entry-listing.component';
import { EntrySearchComponent } from './entry-search/entry-search.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    EntryDetailComponent,
    EntryListingComponent,
    EntrySearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    SsscModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    EntryService,
    { provide: PROVIDER_CONFIG, useValue: AVRE_PROVIDER_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
