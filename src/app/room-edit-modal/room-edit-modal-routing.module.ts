import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomEditModalPage } from './room-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RoomEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomEditModalPageRoutingModule {}
