import {Component, input, OnInit} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {HttpClient} from '@angular/common/http';
import {RequestClientService} from '../../services/request-client.service';
import {RecommendationDTO} from '../../models/RecommendationDTO';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommended-games',
    imports: [
        NgForOf,
        RouterLink,
        NgIf
    ],
  templateUrl: './recommended-games.component.html',
  standalone: true,
  styleUrl: './recommended-games.component.css'
})
export class RecommendedGamesComponent implements OnInit{

  recommendations: RecommendationDTO[]=[];
  isLoaded: boolean=false;

  constructor(private serv: RequestClientService,private router: Router) {}

  showOthersRecommendations() {
    this.isLoaded=false;
    this.fetchRecommendation();
  }

  fetchRecommendation() :void {
    this.serv.getRecommendations().subscribe(recommendations => {
      this.recommendations = recommendations;
      this.isLoaded=true;
    })
  }

  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  ngOnInit(): void {
    this.fetchRecommendation();
  }


}
