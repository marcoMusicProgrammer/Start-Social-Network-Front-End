import {Component, Input} from '@angular/core';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameResp} from '../../models/VideogameResp';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-videogame-stars',
  imports: [
    NgForOf
  ],
  templateUrl: './videogame-stars.component.html',
  styleUrl: './videogame-stars.component.css'
})
export class VideogameStarsComponent {
  @Input() videogame!: VideogameResp;
  totalStars: number[] = [1, 2, 3, 4, 5];

  constructor(private serv: RequestClientService) {}

  updateStars(star: number): void {
    this.videogame!.numberOfStars = star;
    this.serv.updateVideogame(this.videogame).subscribe();
  }
}
