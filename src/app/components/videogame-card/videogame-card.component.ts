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
  // // Stato del cuore
  // heartSelected = false;
  //
  // // Stato delle stelle
  // stars = Array(5).fill(0); // Un array di 5 elementi
  // rating = 0;
  //
  // // Toggle del cuore
  // toggleHeart() {
  //   this.heartSelected = !this.heartSelected;
  // }
  //
  // // Imposta il livello di apprezzamento tramite le stelle
  // rate(value: number) {
  //   this.rating = value;
  // }

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
