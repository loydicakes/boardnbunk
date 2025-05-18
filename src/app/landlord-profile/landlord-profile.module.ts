import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandlordProfilePageRoutingModule } from './landlord-profile-routing.module';

import { LandlordProfilePage } from './landlord-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandlordProfilePageRoutingModule
  ],
  declarations: [LandlordProfilePage]
})
export class LandlordProfilePageModule {}
