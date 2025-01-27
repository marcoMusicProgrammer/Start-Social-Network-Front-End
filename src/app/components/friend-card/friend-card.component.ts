import {Component, Input} from '@angular/core';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-friend-card',
  imports: [
    NgIf
  ],
  templateUrl: './friend-card.component.html',
  standalone: true,
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() user!: ProfileDTOResp;
  @Input() profileImg!: string;
}
