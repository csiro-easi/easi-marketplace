import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatListModule
} from '@angular/material';

import { NavbarComponent, AboutBottomSheet } from './navbar.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    MatBottomSheetModule,
    MatListModule
  ],
  entryComponents: [AboutBottomSheet],
  exports: [NavbarComponent, AboutBottomSheet],
  declarations: [NavbarComponent, AboutBottomSheet]
})
export class NavbarModule {}
