import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlaylistInfoComponent } from './playlist-info/playlist-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { PlaylistTrackInfoComponent } from './playlist-info/playlist-track-info/playlist-track-info.component';
import { PlaylistCompareComponent } from './playlist-info/playlist-compare/playlist-compare.component';
import { PlaylistFollowerSelectionComponent } from './playlist-info/playlist-compare/playlist-follower-selection/playlist-follower-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoaderComponent,
    PlaylistInfoComponent,
    PlaylistTrackInfoComponent,
    PlaylistCompareComponent,
    PlaylistFollowerSelectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule
  ],
  entryComponents: [
    PlaylistFollowerSelectionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
