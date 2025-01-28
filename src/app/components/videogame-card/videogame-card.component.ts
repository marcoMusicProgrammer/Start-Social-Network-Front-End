import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {VideogameResp} from '../../models/VideogameResp';
import {RouterLink} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';

@Component({
  selector: 'app-videogame-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './videogame-card.component.html',
  standalone: true,
  styleUrl: './videogame-card.component.css'
})
export class VideogameCardComponent {

  @Input() videogame!: VideogameResp;
  @Output() newFavorite: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeFavorite: EventEmitter<number> = new EventEmitter<number>();


  addToFavorites() {
    this.newFavorite.emit(this.videogame.appId);
  }

  removeFromFavorites() {
    this.removeFavorite.emit(this.videogame.appId);
  }

  constructor(serv: RequestClientService) {
    const stars = document.querySelectorAll(".stars a");
    const allStars = document.querySelector(".stars");

    stars.forEach((star, clickedIdx) => {

      console.log(`star of index ${clickedIdx} was clicked`);

      // this.videogame.numberOfStars=(clickedIdx+1)*2;
      // serv.updateVideogame(this.videogame);

    })
  };


}


