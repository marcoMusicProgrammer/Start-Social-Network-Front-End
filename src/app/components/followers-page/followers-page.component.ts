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

  constructor(private serv:RequestClientService) {
    this.serv.getAllFollowers().subscribe({
      next:(response: FriendSummuryDTO[]) => {
        this.followersList = response;
        console.log(this.followersList);
      }
    })
  }

}
