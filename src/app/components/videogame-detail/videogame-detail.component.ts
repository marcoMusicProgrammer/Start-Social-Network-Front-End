import { Component } from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';

@Component({
  selector: 'app-videogame-detail',
  imports: [
    NewsCardComponent
  ],
  templateUrl: './videogame-detail.component.html',
  standalone: true,
  styleUrl: './videogame-detail.component.css'
})
export class VideogameDetailComponent {

}
