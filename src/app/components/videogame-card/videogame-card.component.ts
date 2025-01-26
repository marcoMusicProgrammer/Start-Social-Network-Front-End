import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {VideogameResp} from '../../models/VideogameResp';
import {RouterLink} from '@angular/router';

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
  @Output() newFavorite:EventEmitter<number> = new EventEmitter<number>();
  @Output() removeFavorite:EventEmitter<number> = new EventEmitter<number>();


  addToFavorites() {
    this.newFavorite.emit(this.videogame.appId);
  }

  removeFromFavorites() {
    this.removeFavorite.emit(this.videogame.appId);
  }


}

const stars = document.querySelectorAll(".stars ");
stars.forEach((star,idx) => {
    star.addEventListener('click', () => {
      console.log(`star of index ${idx} was clicked`);
    })
  }
)
console.log(stars);
