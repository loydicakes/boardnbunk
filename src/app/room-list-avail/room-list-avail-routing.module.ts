import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomListAvailPage } from './room-list-avail.page';

const routes: Routes = [
  {
    path: '',
    component: RoomListAvailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomListAvailPageRoutingModule {}
