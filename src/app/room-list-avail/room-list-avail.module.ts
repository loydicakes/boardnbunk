import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomListAvailPageRoutingModule } from './room-list-avail-routing.module';

import { RoomListAvailPage } from './room-list-avail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomListAvailPageRoutingModule
  ],
  declarations: [RoomListAvailPage]
})
export class RoomListAvailPageModule {}
