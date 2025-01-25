import {Component, Input} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {CredentialService} from '../../services/credential.service';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../../models/ErrorResponse';

@Component({
  selector: 'app-other-users-posts',
  imports: [],
  templateUrl: './other-users-posts.component.html',
  standalone: true,
  styleUrl: './other-users-posts.component.css'
})
export class OtherUsersPostsComponent {

  @Input() post!: PostDTOResp;

  errorMessage = '';
  userProfile: ProfileDTOResp =
    {
      id:0,
      steamId:0,
      followersCount:0,
      followingCount:0,
      favoriteVideogameAppId:0,
      lastPlayedVideogameAppId:0,
      profileName:'',
      steamName:'',
      playstationName:'',
      xboxName:'',
      profileImgId:'',
      profileBackdropImgId:'',
      lastPlayedGameImgUrl:''
    };

  constructor( private serv: RequestClientService) {
    setTimeout(() => {
      this.serv.getProfileId(this.post.profileId).subscribe({
        next: (response: ProfileDTOResp) => {
          console.log(response)
          this.userProfile = response
        },
        error: (err: ErrorResponse) =>
          this.errorMessage = err.message
      })
      },100
    )
  };
}
