import { Component } from '@angular/core';
import {VideogameCardComponent} from '../videogame-card/videogame-card.component';
import {Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameResp} from '../../models/VideogameResp';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-videogame-page',
  imports: [
    VideogameCardComponent,
    NgForOf
  ],
  templateUrl: './videogame-page.component.html',
  standalone: true,
  styleUrl: './videogame-page.component.css'
})
export class VideogamePageComponent {
  videogames: VideogameResp[] = [];
  constructor(private router: Router, private serv: RequestClientService)
  {
    this.serv.getAllVideogames().subscribe(
      response => {
        this.videogames = response;
      }
    )
  }

  handleNewFavorite(appId: number) {
    let i=this.videogames.findIndex(v => v.appId === appId);
    let favorite = this.videogames[i];
    favorite.preferred = true;
    this.serv.updateVideogame(favorite).subscribe();
    setTimeout(() => {
      const favoriteElement = document.getElementById(`videogame-${appId}`);
      if (favoriteElement) {
        favoriteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 10);
  }

  handleRemoveFavorite(appId: number) {
    let i=this.videogames.findIndex(v => v.appId === appId);
    let favorite = this.videogames[i];
    favorite.preferred = false;
    this.serv.updateVideogame(favorite).subscribe();
    setTimeout(() => {
      const favoriteElement = document.getElementById(`videogame-${appId}`);
      if (favoriteElement) {
        favoriteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 10);
  }
}
