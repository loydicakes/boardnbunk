import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentRentPageRoutingModule } from './current-rent-routing.module';

import { CurrentRentPage } from './current-rent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentRentPageRoutingModule
  ],
  declarations: [CurrentRentPage]
})
export class CurrentRentPageModule {}
