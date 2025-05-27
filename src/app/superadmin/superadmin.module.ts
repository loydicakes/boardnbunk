import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperadminPageRoutingModule } from './superadmin-routing.module';

import { SuperadminPage } from './superadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperadminPageRoutingModule
  ],
  declarations: [SuperadminPage]
})
export class SuperadminPageModule {}
