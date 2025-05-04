import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'faves', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
