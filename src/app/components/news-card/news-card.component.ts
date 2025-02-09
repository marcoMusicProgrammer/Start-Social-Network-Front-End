import {Component, Input} from '@angular/core';
import {RequestClientService} from '../../services/request-client.service';
import {NewsDTO} from '../../models/NewsDTO';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-news-card',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './news-card.component.html',
  standalone: true,
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input() appId!: number;
  articles: NewsDTO[]=[];

  constructor(private serv:RequestClientService) {}

  ngOnInit(): void {
    if (this.appId) {
      this.serv.getNewsVideogame(this.appId).subscribe(news => {
        this.articles = news;
      });
    }
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

}
