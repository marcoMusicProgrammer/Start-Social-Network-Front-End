import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {RecommendedGamesComponent} from './components/recommended-games/recommended-games.component';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {LeftNavbarComponent} from './components/left-navbar/left-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SigninPageComponent, UserProfilePageComponent, RecommendedGamesComponent, NgIf, LeftNavbarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VsnFrontend';
  routerLinks = ''

  constructor(private router: Router) {
      this.routerLinks = this.router.url;
      console.log(this.routerLinks);
  }


  inLogin()
  {
    if(this.routerLinks === '/')
      return false;

    return true;
  }




}
