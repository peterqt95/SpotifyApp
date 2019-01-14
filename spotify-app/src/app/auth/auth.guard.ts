import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const url: string = state.url;
      const spotifyCode = this.router.parseUrl(url).queryParamMap.get('code');
      return this.checkQueryParameters(spotifyCode);
  }

  checkQueryParameters(spotifyCode: string) {
    // Check if we get a valid response
    return this.spotifyService.getUserInfo(spotifyCode).pipe(
      map( res => {
        // Check to make sure that the response is the user information
        if (res.hasOwnProperty('display_name')) {
          this.spotifyService.userInfo = res;
          return true;
        } else {
          return false;
        }
      }, err => {
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
