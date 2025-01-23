import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {RecommendedGamesComponent} from './components/recommended-games/recommended-games.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SigninPageComponent, UserProfilePageComponent, RecommendedGamesComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VsnFrontend';

}
