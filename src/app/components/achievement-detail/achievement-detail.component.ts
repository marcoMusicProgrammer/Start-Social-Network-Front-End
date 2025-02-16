import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {AchievementDTO} from '../../models/AchievementDTO';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-achievement-detail',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './achievement-detail.component.html',
  styleUrl: './achievement-detail.component.css',
  standalone: true
})
export class AchievementDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute, private serv: RequestClientService) {
  }

  appId!:number;
  achievements:AchievementDTO[]=[];
  isLoaded: boolean=false;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appId= +params['appId'];
      this.serv.getAchievementsVideogame(this.appId).subscribe(
        res=> {
          this.achievements = res;
          this.isLoaded=true;
        })
    })
  }

  get hasAchievements(): boolean {
    return this.achievements && this.achievements.length > 0;
  }

}
