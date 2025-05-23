import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomUnavailableListPageRoutingModule } from './room-unavailable-list-routing.module';

import { RoomUnavailableListPage } from './room-unavailable-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomUnavailableListPageRoutingModule
  ],
  declarations: [RoomUnavailableListPage]
})
export class RoomUnavailableListPageModule {}
