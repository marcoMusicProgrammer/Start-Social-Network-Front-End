import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {authenticationGuard} from './guard/authentication.guard';
import {VideogamePageComponent} from './components/videogame-page/videogame-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {
  StrangerUserProfilePageComponent
} from './components/stranger-user-profile-page/stranger-user-profile-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent,pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'uservideogame', component: VideogamePageComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'external-user', component: StrangerUserProfilePageComponent },
  { path: 'user-profile/:id', component: UserProfilePageComponent,canActivate: [authenticationGuard]},

];
