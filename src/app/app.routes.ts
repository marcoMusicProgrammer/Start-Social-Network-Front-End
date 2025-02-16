import { Routes } from '@angular/router';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {authenticationGuard} from './guard/authentication.guard';
import {VideogamePageComponent} from './components/videogame-page/videogame-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {VideogameDetailComponent} from './components/videogame-detail/videogame-detail.component';
import {
  StrangerUserProfilePageComponent
} from './components/stranger-user-profile-page/stranger-user-profile-page.component';
import {FollowersPageComponent} from './components/followers-page/followers-page.component';
import {FollowingsPageComponent} from './components/followings-page/followings-page.component';
import {AchievementsPageComponent} from './components/achievements-page/achievements-page.component';
import {AchievementDetailComponent} from './components/achievement-detail/achievement-detail.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent,pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'uservideogame', component: VideogamePageComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'external-user/:id', component: StrangerUserProfilePageComponent },
  { path: 'videogame-detail/:appId', component: VideogameDetailComponent },
  { path: 'user-profile/:id', component: UserProfilePageComponent,canActivate: [authenticationGuard]},
  { path: 'followers', component: FollowersPageComponent},
  { path: 'following', component: FollowingsPageComponent},
  { path: 'achievements', component: AchievementsPageComponent},
  { path: 'achievement-detail/:appId', component: AchievementDetailComponent},
];


