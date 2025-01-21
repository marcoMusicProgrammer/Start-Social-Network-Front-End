import { Component } from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {Post} from '../../models/Post';
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
  allPosts:Post[] = [];

  constructor(private serv: RequestClientService) {}

  getAllPosts(): void {
    this.serv.getAllUsersPost().subscribe({
      next: (response: Post[]) => {
        this.allPosts = response;

      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    }
  }
}
