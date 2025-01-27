import {Component, input} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {HttpClient} from '@angular/common/http';
import {RequestClientService} from '../../services/request-client.service';
import {RecommendationDTO} from '../../models/RecommendationDTO';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommended-games',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './recommended-games.component.html',
  standalone: true,
  styleUrl: './recommended-games.component.css'
})
export class RecommendedGamesComponent {
  // @input() isLogin!:boolean;

  recommendations: RecommendationDTO[]=[];

  constructor(private serv: RequestClientService,private router: Router) {
    serv.getRecommendations().subscribe(recommendations => {
      this.recommendations = recommendations;
    })
  }

  showOthersRecommendations() {
    this.serv.getRecommendations().subscribe(recommendations => {
      this.recommendations = recommendations;
    })
  }

  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return ''; // Se il testo non è definito, restituisci una stringa vuota
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }


}
