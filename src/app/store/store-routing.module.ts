import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { StoreHomeComponent } from './store-home.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

const routes: Routes = [{
  path: 'store',
  component: StoreComponent,
  children: [
    {
      path: 'detail/:id',
      component: EntryDetailComponent
    },
    {
      path: '',
      component: StoreHomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
