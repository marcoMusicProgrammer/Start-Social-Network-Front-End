import { Component } from '@angular/core';
import {VideogameCardComponent} from '../videogame-card/videogame-card.component';

@Component({
  selector: 'app-videogame-page',
  imports: [
    VideogameCardComponent
  ],
  templateUrl: './videogame-page.component.html',
  standalone: true,
  styleUrl: './videogame-page.component.css'
})
export class VideogamePageComponent {

}
