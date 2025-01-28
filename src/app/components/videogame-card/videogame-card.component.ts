import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {VideogameResp} from '../../models/VideogameResp';
import {RouterLink} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {LoginResponse} from '../../models/LoginResponse';

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

  constructor(private serv:RequestClientService) {

  }

  addToFavorites() {
    this.newFavorite.emit(this.videogame.appId);
  }

  removeFromFavorites() {
    this.removeFavorite.emit(this.videogame.appId);
  }

  addStar1(){
    this.videogame.numberOfStars = 2;
    this.serv.addStars(this.videogame).subscribe({
      next: (response: LoginResponse) => {
        console.log(response)
      },
      error: err => {
        console.log(err)
      }
    });
  }




}
