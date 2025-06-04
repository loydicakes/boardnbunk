import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-pns',
    loadChildren: () => import('./profile-pns/profile-pns.module').then( m => m.ProfilePnsPageModule)
  },
  {
    path: 'profile-pm',
    loadChildren: () => import('./profile-pm/profile-pm.module').then( m => m.ProfilePmPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'faves',
    loadChildren: () => import('./faves/faves.module').then( m => m.FavesPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'infos/:id',
    loadChildren: () => import('./infos/infos.module').then(m => m.InfosPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'landlord-home',
    loadChildren: () => import('./landlord-home/landlord-home.module').then( m => m.LandlordHomePageModule)
  },
  {
    path: 'landlord-profile',
    loadChildren: () => import('./landlord-profile/landlord-profile.module').then( m => m.LandlordProfilePageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'room-list-avail',
    loadChildren: () => import('./room-list-avail/room-list-avail.module').then( m => m.RoomListAvailPageModule)
  },
  {
    path: 'room-edit-modal',
    loadChildren: () => import('./room-edit-modal/room-edit-modal.module').then( m => m.RoomEditModalPageModule)
  },
  {
    path: 'room-unavailable-list',
    loadChildren: () => import('./room-unavailable-list/room-unavailable-list.module').then( m => m.RoomUnavailableListPageModule)
  },
  {
    path: 'landlord-tenants',
    loadChildren: () => import('./landlord-tenants/landlord-tenants.module').then( m => m.LandlordTenantsPageModule)
  },
  {
    path: 'superadmin',
    loadChildren: () => import('./superadmin/superadmin.module').then( m => m.SuperadminPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'current-rent',
    loadChildren: () => import('./current-rent/current-rent.module').then( m => m.CurrentRentPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
