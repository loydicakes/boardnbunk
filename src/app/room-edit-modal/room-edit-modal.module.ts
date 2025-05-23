import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Add this
import { IonicModule } from '@ionic/angular';

import { RoomEditModalPageRoutingModule } from './room-edit-modal-routing.module';
import { RoomEditModalPage } from './room-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Add this line
    IonicModule,
    RoomEditModalPageRoutingModule
  ],
  declarations: [RoomEditModalPage]
})
export class RoomEditModalPageModule {}
