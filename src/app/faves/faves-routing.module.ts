import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavesPage } from './faves.page';

const routes: Routes = [
  {
    path: '',
    component: FavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavesPageRoutingModule {}
