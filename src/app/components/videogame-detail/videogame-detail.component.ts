import {Component, OnInit} from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameDetailDTO} from '../../models/VideogameDetailDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaceDashPipe} from '../../pipes/replaceDashPipe';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ReplaceCommaPipe} from '../../pipes/replaceCommaPipe';

@Component({
  imports: [
    NewsCardComponent,
    ReplaceDashPipe,
    NgIf,
    DatePipe,
    NgForOf,
    ReplaceCommaPipe
  ],
  selector: 'app-videogame-detail',
  standalone: true,
  styleUrl: './videogame-detail.component.css',
  templateUrl: './videogame-detail.component.html'
})
export class VideogameDetailComponent implements OnInit {

  videogame!: VideogameDetailDTO;
  appId!: number;
  totalStars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute, private serv: RequestClientService) {
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appId = +params['appId'];
      this.serv.getVideogameDetail(this.appId).subscribe(videogame => {
        this.videogame = videogame;
      })
    });
  }

}
