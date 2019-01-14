import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isLoaded = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.isLoaded = true;
  }

  userLogin() {
    this.spotifyService.getUserLogin().subscribe(
      data => {
        window.location.href = data['auth_url'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
