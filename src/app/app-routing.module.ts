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
    path: 'notifs',
    loadChildren: () => import('./notifs/notifs.module').then( m => m.NotifsPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('./infos/infos.module').then( m => m.InfosPageModule)
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
  },  {
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
