import { Component } from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameDetailDTO} from '../../models/VideogameDetailDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaceDashPipe} from '../../pipes/replaceDashPipe';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  imports: [
    NewsCardComponent,
    ReplaceDashPipe,
    NgIf,
    DatePipe
  ],
  selector: 'app-videogame-detail',
  standalone: true,
  styleUrl: './videogame-detail.component.css',
  templateUrl: './videogame-detail.component.html'
})
export class VideogameDetailComponent {

  videogame!: VideogameDetailDTO;
  appId!: number;

  constructor(private route: ActivatedRoute, private serv: RequestClientService) {
    this.route.params.subscribe(params => {this.appId = +params['appId'];
      this.serv.getVideogameDetail(this.appId).subscribe(videogame => {
        this.videogame = videogame;
        console.log(videogame);
      })
    });
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

}
