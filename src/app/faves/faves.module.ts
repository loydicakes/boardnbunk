import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavesPageRoutingModule } from './faves-routing.module';

import { FavesPage } from './faves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavesPageRoutingModule
  ],
  declarations: [FavesPage]
})
export class FavesPageModule {}
