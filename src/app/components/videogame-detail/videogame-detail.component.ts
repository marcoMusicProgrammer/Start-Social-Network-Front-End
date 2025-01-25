import { Component } from '@angular/core';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameDetailDTO} from '../../models/VideogameDetailDTO';
import {ActivatedRoute, Router} from '@angular/router';

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

  videogame!: VideogameDetailDTO;
  appId!: string;
  constructor(private route: ActivatedRoute, private serv: RequestClientService) {}

  ngOnInit(): void {
    this.appId = this.route.snapshot.paramMap.get('appId')!;
    console.log('App ID:', this.appId);
  }
}
