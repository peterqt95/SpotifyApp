import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  djangoUrl = environment.djangoUrl;

  // Store the user results
  userInfo;

  constructor(private http: HttpClient) { }

  getUserLogin() {
    return this.http.get(this.djangoUrl + '/api/login');
  }

  getUserInfo(spotifyCode: string) {
    return this.http.get(this.djangoUrl + '/api/login?code=' + spotifyCode);
  }

  // Id should be the spotify id
  getUserPlaylists(id: string) {
    return this.http.get(this.djangoUrl + '/api/user-playlists/' + id);
  }

  // Id is the playlist id, username is the spotify user
  getPlaylistTracks(id: string, username: string) {
    return this.http.get(this.djangoUrl + '/api/user-playlists/' + username + '/' + id);
  }
}
