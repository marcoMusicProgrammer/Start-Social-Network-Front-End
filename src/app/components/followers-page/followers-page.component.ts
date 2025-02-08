import { Component } from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {FriendSummuryDTO} from '../../models/FriendSummuryDTO';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-followers-page',
  imports: [
    FriendCardComponent,
    NgForOf
  ],
  templateUrl: './followers-page.component.html',
  standalone: true,
  styleUrl: './followers-page.component.css'
})
export class FollowersPageComponent {

  followersList: FriendSummuryDTO[] = [];

  userProfile: ProfileDTOResp =
    {
      id:0,
      steamId:0,
      followersCount:0,
      followingCount:0,
      lastPlayedVideogameAppId:0,
      profileName:'',
      steamName:'',
      playstationName:'',
      xboxName:'',
      profileImgId:'',
      profileBackdropImgId:'',
      lastPlayedGameImgUrl:'',
      lastPlayedGameName:''
    };

  constructor(private serv:RequestClientService) {
    this.serv.getAllFollowers().subscribe({
      next:(response: FriendSummuryDTO[]) => {
        this.followersList = response;
        console.log(this.followersList);
      }
    })

  }

}
