import { Component } from '@angular/core';

@Component({
  selector: 'app-videogame-card',
  imports: [],
  templateUrl: './videogame-card.component.html',
  standalone: true,
  styleUrl: './videogame-card.component.css'
})
export class VideogameCardComponent {
  // Stato del cuore
  heartSelected = false;

  // Stato delle stelle
  stars = Array(5).fill(0); // Un array di 5 elementi
  rating = 0;

  // Toggle del cuore
  toggleHeart() {
    this.heartSelected = !this.heartSelected;
  }

  // Imposta il livello di apprezzamento tramite le stelle
  rate(value: number) {
    this.rating = value;
  }

}
