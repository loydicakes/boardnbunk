import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePmPageRoutingModule } from './profile-pm-routing.module';

import { ProfilePmPage } from './profile-pm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePmPageRoutingModule
  ],
  declarations: [ProfilePmPage]
})
export class ProfilePmPageModule {}
