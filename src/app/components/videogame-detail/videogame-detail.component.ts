import { Component } from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameDetailDTO} from '../../models/VideogameDetailDTO';
import {Router} from '@angular/router';

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
  videogame: VideogameDetailDTO|undefined;

  constructor(private router: Router, private serv: RequestClientService ) {
  }
}
