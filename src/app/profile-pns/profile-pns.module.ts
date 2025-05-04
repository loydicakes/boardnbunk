import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePnsPageRoutingModule } from './profile-pns-routing.module';

import { ProfilePnsPage } from './profile-pns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePnsPageRoutingModule
  ],
  declarations: [ProfilePnsPage]
})
export class ProfilePnsPageModule {}
