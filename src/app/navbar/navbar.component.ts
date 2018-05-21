import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(AboutBottomSheet);
  }
}

@Component({
  selector: 'app-about',
  templateUrl: 'about.html',
})
export class AboutBottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<AboutBottomSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
  
  