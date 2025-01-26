import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';

@Component({
  selector: 'app-user-post',
  imports: [],
  templateUrl: './user-post.component.html',
  standalone: true,
  styleUrl: './user-post.component.css',

})
export class UserPostComponent {

  @Input() post!: PostDTOResp;
  @Input() user!: ProfileDTOResp;
  @Input() profileImg!: string;
  @Output() delete:EventEmitter<number> = new EventEmitter<number>()

  constructor(private router: Router, private serv: RequestClientService) {
  }

  lanciaEvento() {
    this.delete.emit(this.post.id)
  }



}
