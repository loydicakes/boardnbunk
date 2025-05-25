import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandlordTenantsPageRoutingModule } from './landlord-tenants-routing.module';

import { LandlordTenantsPage } from './landlord-tenants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandlordTenantsPageRoutingModule
  ],
  declarations: [LandlordTenantsPage]
})
export class LandlordTenantsPageModule {}
