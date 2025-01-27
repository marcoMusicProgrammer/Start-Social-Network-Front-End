import {Component, Input} from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';

@Component({
  selector: 'app-friend-page',
  imports: [
    FriendCardComponent
  ],
  templateUrl: './friend-page.component.html',
  standalone: true,
  styleUrl: './friend-page.component.css'
})
export class FriendPageComponent {

}
