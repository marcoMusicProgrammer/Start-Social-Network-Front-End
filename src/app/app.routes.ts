import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {authenticationGuard} from './guard/authentication.guard';
import {VideogamePageComponent} from './components/videogame-page/videogame-page.component';
import {VideogameCardComponent} from './components/videogame-card/videogame-card.component';
import {HomePageComponent} from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent,pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'uservideogame', component: VideogamePageComponent},
  { path: 'home', component: HomePageComponent },
  // { path: 'signin', component: SigninPageComponent },
  { path: 'videogame-detail/:appId', component: VideogameCardComponent },
  { path: 'user-profile/:id', component: UserProfilePageComponent,canActivate: [authenticationGuard]},

];
