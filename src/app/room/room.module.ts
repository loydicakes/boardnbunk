import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Add ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';
import { RoomPage } from './room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // ✅ This enables [formGroup] and reactive forms
    IonicModule,
    RoomPageRoutingModule
  ],
  declarations: [RoomPage]
})
export class RoomPageModule {}
