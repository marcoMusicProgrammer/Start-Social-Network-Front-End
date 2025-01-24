import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {RecommendedGamesComponent} from './components/recommended-games/recommended-games.component';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';
import {VideogamePageComponent} from './components/videogame-page/videogame-page.component';
import {VideogameDetailComponent} from './components/videogame-detail/videogame-detail.component';
import {LeftNavbarComponent} from './components/left-navbar/left-navbar.component';
import {UserPostComponent} from './components/user-post/user-post.component';
import {ProfileDTOResp} from './models/ProfileDTOResp';
import {RequestClientService} from './services/request-client.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SigninPageComponent, UserProfilePageComponent, RecommendedGamesComponent, NgIf, VideogamePageComponent, VideogameDetailComponent, LeftNavbarComponent, UserPostComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'VsnFrontend';
  routerLinks = ''
  userProfile: ProfileDTOResp =
    {
      id:0,
      steamId:0,
      followersCount:0,
      followingCount:0,
      favoriteVideogameAppId:0,
      lastPlayedVideogameAppId:0,
      profileName:'',
      steamName:'',
      playstationName:'',
      xboxName:'',
      profileImgId:'',
      profileBackdropImgId:'',
      lastPlayedGameImgUrl:''
    };

  constructor(private router: Router, private serv: RequestClientService) {
    this.serv.getProfile().subscribe({
      next: (response: ProfileDTOResp) => {
        this.userProfile = response
      }
    })
  }

  ngOnInit(): void {
    // Sottoscriviti agli eventi di navigazione del router
    this.router.initialNavigation()
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routerLinks = event.urlAfterRedirects; // Aggiorna l'URL corrente
        console.log('Navigazione terminata, URL corrente:', this.routerLinks);
      });
  }

  inLogin()
  {
    return !(this.routerLinks == '/' || this.routerLinks == '/login' || this.routerLinks == '/signin');
  }

}
