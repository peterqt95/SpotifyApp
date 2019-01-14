import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { MatDialog } from '@angular/material';
import { PlaylistFollowerSelectionComponent } from './playlist-follower-selection/playlist-follower-selection.component';

@Component({
  selector: 'app-playlist-compare',
  templateUrl: './playlist-compare.component.html',
  styleUrls: ['./playlist-compare.component.css']
})
export class PlaylistCompareComponent implements OnInit {

  // User info
  userInfo;

  // This is the playlist id
  playlistId: string;

  // Playlist info
  playlist;

  // Tracks in playlist
  playlistTracks;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    // Get the playlist id and user
    this.playlistId = this.route.snapshot.paramMap.get('id');
    this.userInfo = this.spotifyService.userInfo;

    // Get the track information
    this.getPlaylistTracks(this.playlistId, this.userInfo);
  }

  getPlaylistTracks(playlistId: string, userInfo: any) {
    this.spotifyService.getPlaylistTracks(playlistId, userInfo['display_name']).subscribe(
      data => {
        console.log(data);
        this.playlist = data;

        // Store the track data
        this.playlistTracks = data['tracks']['items'];
      },
      err => {
        console.log(err);
      }
    );
  }

  openPlaylistSelection() {
    const dialogRef = this.dialog.open(PlaylistFollowerSelectionComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
