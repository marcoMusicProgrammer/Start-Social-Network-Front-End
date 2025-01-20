import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SigninPageComponent} from './components/signin-page/signin-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SigninPageComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VsnFrontend';
}
