import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: SigninPageComponent },
];
