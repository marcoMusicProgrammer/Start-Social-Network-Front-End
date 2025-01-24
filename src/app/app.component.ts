import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SigninPageComponent, UserProfilePageComponent, RecommendedGamesComponent, NgIf, VideogamePageComponent, VideogameDetailComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'VsnFrontend';
  routerLinks = ''

  constructor(private router: Router) {
      this.routerLinks = this.router.url;
      console.log(this.routerLinks);
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

// .subscribe((event: NavigationEnd) => {
//   this.routerLinks = event.urlAfterRedirects; // Aggiorna l'URL corrente
//   console.log('Navigazione terminata, URL corrente:', this.routerLinks);
// });

  inLogin()
  {
    return this.routerLinks !== '/'
  }
}
