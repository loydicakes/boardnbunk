import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsPage } from './reviews.page';

const routes: Routes = [
  {
    path: ':roomId',
    component: ReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsPageRoutingModule {}
