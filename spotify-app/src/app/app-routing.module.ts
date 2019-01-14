import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlaylistInfoComponent } from './playlist-info/playlist-info.component';
import { PlaylistTrackInfoComponent } from './playlist-info/playlist-track-info/playlist-track-info.component';
import { PlaylistCompareComponent } from './playlist-info/playlist-compare/playlist-compare.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LoginPageComponent },
  { path: 'playlists', component: PlaylistInfoComponent, canActivate: [AuthGuard]},
  { path: 'playlists/:id', component: PlaylistTrackInfoComponent, canActivate: [AuthGuard]},
  { path: 'playlists/compare/:id', component: PlaylistCompareComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
