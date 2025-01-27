import {Component, Input} from '@angular/core';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {NgIf} from '@angular/common';
import {RequestClientService} from '../../services/request-client.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-friend-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './friend-card.component.html',
  standalone: true,
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() user!: ProfileDTOResp;
  @Input() profileImg!: string;

}
