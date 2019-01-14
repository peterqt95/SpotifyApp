import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-playlist-track-info',
  templateUrl: './playlist-track-info.component.html',
  styleUrls: ['./playlist-track-info.component.css']
})
export class PlaylistTrackInfoComponent implements OnInit {

  // User info
  userInfo;

  // This is the playlist id
  playlistId: string;

  // Playlist info
  playlist;

  // Tracks in playlist
  playlistTracks;

  // Table display
  displayColumns: string[] = ['play', 'name', 'artist', 'duration'];

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute, private router: Router) { }

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

  // Toggle preview button of playing song
  togglePreview(event: any) {
    const audio = event.currentTarget.querySelector('audio');
    const play = event.currentTarget.getElementsByClassName('pv-play')[0];
    const pause = event.currentTarget.getElementsByClassName('pv-pause')[0];

    // Show the correct action depending on the button hidden
    if (play.classList.contains('pv-hidden')) {
      play.classList.remove('pv-hidden');
      pause.classList.add('pv-hidden');
      audio.pause();
    } else {
      // Pause all other songs
      const audioPlayers = document.getElementById('track-table').getElementsByClassName('spotify-preview');
      for (let i = 0; i < audioPlayers.length; i++) {
        const curAudio = audioPlayers[i].querySelector('audio');
        const curPlay = audioPlayers[i].getElementsByClassName('pv-play')[0];
        const curPause = audioPlayers[i].getElementsByClassName('pv-pause')[0];
        curAudio.pause();
        curPlay.classList.remove('pv-hidden');
        curPause.classList.add('pv-hidden');
      }

      // Play this song
      play.classList.add('pv-hidden');
      pause.classList.remove('pv-hidden');
      audio.play();
    }
  }
}
