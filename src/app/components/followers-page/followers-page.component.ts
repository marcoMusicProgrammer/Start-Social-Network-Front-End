import { Component } from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';

@Component({
  selector: 'app-followers-page',
  imports: [
    FriendCardComponent
  ],
  templateUrl: './followers-page.component.html',
  standalone: true,
  styleUrl: './followers-page.component.css'
})
export class FollowersPageComponent {

}
