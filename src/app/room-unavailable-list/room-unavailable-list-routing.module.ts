import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomUnavailableListPage } from './room-unavailable-list.page';

const routes: Routes = [
  {
    path: '',
    component: RoomUnavailableListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomUnavailableListPageRoutingModule {}
