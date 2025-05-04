import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePmPage } from './profile-pm.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePmPageRoutingModule {}
