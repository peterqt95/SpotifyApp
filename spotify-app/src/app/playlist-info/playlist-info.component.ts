import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.css']
})
export class PlaylistInfoComponent implements OnInit {

  // User info
  userInfo;

  // Playlists info
  playlistsInfo;

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit() {
    this.userInfo = this.spotifyService.userInfo;
    // Grab playlists
    this.getUserPlaylists(this.userInfo['id']);
  }

  getUserPlaylists(id: string) {
    this.spotifyService.getUserPlaylists(id).subscribe(
      data => {
        console.log(data);
        this.playlistsInfo = data['items'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
