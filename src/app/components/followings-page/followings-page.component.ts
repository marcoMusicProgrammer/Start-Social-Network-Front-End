import { Component } from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';

@Component({
  selector: 'app-followings-page',
  imports: [
    FriendCardComponent
  ],
  templateUrl: './followings-page.component.html',
  standalone: true,
  styleUrl: './followings-page.component.css'
})
export class FollowingsPageComponent {

}
