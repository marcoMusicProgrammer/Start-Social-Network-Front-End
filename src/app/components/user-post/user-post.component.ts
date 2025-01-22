import {Component, Input} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';

@Component({
  selector: 'app-user-post',
  imports: [],
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {

  @Input() post!: PostDTOResp;


}
