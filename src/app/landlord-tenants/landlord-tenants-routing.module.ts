import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandlordTenantsPage } from './landlord-tenants.page';

const routes: Routes = [
  {
    path: '',
    component: LandlordTenantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandlordTenantsPageRoutingModule {}
