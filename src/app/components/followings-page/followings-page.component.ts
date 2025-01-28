import { Component } from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';
import {RequestClientService} from '../../services/request-client.service';
import {FriendSummuryDTO} from '../../models/FriendSummuryDTO';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-followings-page',
  imports: [
    FriendCardComponent,
    NgForOf
  ],
  templateUrl: './followings-page.component.html',
  standalone: true,
  styleUrl: './followings-page.component.css'
})
export class FollowingsPageComponent {

  listFollowing: FriendSummuryDTO[] = [];

  constructor(private serv:RequestClientService) {
    this.serv.getAllFollowing().subscribe({
      next: (response: FriendSummuryDTO[]) => {
        this.listFollowing = response;
        console.log(this.listFollowing);
      }
    })
  }

}
