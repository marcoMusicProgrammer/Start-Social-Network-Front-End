import {Component, Input} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';

@Component({
  selector: 'app-user-post',
  imports: [],
  templateUrl: './user-post.component.html',
  standalone: true,
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {

  @Input() post!: PostDTOResp;
  @Input() user!: ProfileDTOResp;

  constructor(private router: Router, private serv: RequestClientService) {
    console.log(this.user)
  }

}
