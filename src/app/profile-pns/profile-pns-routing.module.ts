import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePnsPage } from './profile-pns.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePnsPageRoutingModule {}
