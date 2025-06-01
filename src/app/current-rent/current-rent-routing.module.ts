import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentRentPage } from './current-rent.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentRentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentRentPageRoutingModule {}
