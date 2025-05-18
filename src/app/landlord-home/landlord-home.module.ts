import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandlordHomePageRoutingModule } from './landlord-home-routing.module';

import { LandlordHomePage } from './landlord-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandlordHomePageRoutingModule
  ],
  declarations: [LandlordHomePage]
})
export class LandlordHomePageModule {}
