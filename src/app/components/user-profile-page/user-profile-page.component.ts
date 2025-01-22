import { Component } from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {Observable} from 'rxjs';
import {ErrorResponse} from '../../models/ErrorResponse';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    UserPostComponent
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {
  errorMessage= '';
  allPosts:PostDTOResp[] = [];

  constructor(private serv: RequestClientService) {}

  // getAllPosts(): void {
  //   this.serv.getAllUsersPost().subscribe({
  //     next: (response: PostDTOResp[]) => {
  //       this.allPosts = response;
  //
  //     },
  //     error: (err: ErrorResponse) => {
  //       this.errorMessage = err.message;
  //     }
  //   }
  // }
}
