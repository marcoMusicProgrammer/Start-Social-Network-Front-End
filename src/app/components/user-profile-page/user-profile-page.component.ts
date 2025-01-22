import { Component } from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {Observable} from 'rxjs';
import {ErrorResponse} from '../../models/ErrorResponse';
import {PostDTOReq} from '../../models/PostDTOReq';
import {SignInResponse} from '../../models/SignInResponse';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CredentialService} from '../../services/credential.service';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    NgForOf
  ],
  templateUrl: './user-profile-page.component.html',
  standalone: true,
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {
  errorMessage= '';
  newPost:PostDTOReq = {content:'',image:'',profileId:0,nLike:0}
  allPosts:PostDTOResp[] = [];

  constructor(private serv: RequestClientService,private servCred: CredentialService) {
    this.serv.getAllUsersPost().subscribe({
      next: (response: PostDTOResp[]) => {
        this.allPosts = response;
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    })
  }

  makeAPost() {
    this.serv.newPost(this.newPost).subscribe({
      next: (response: PostDTOReq) => {
        this.newPost = response;
      }
    })
  }
}
