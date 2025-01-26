import { Component } from '@angular/core';
import {PostDTOReq} from '../../models/PostDTOReq';
import {BehaviorSubject} from 'rxjs';
import {PostDTOResp} from '../../models/PostDTOResp';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {VideogameResp} from '../../models/VideogameResp';
import {RequestClientService} from '../../services/request-client.service';
import {CredentialService} from '../../services/credential.service';
import {ErrorResponse} from '../../models/ErrorResponse';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UserPostComponent} from '../user-post/user-post.component';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-stranger-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './stranger-user-profile-page.component.html',
  standalone: true,
  styleUrl: './stranger-user-profile-page.component.css'
})
export class StrangerUserProfilePageComponent {

  errorMessage= '';
  successMessage: string = ''
  newPost:PostDTOReq = {content:'',image:'',profileId:0,nLike:0}
  allPosts$ = new BehaviorSubject <PostDTOResp[]>([]);
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

  // Variables for save image urls
  backdropImage: string = '';
  profileImage: string = '';
  profileBackdropImageUrl = new BehaviorSubject <SafeUrl>(null!);
  profileImageUrl = new BehaviorSubject<SafeUrl>(null!);

  imgVideogamePreferred:string|undefined="https://cdn2.iconfinder.com/data/icons/prohibitions/105/15-512.png";
  preferredVideogames: VideogameResp[] = []

  /**
   * When the component is made load both the service and gets all the post and user information
   * @param serv
   * @param servCred
   * @param sanitizer
   */
  constructor(
    private serv: RequestClientService,
    private servCred: CredentialService,
    private sanitizer: DomSanitizer) {

    this.serv.getAllUsersPost().subscribe({
      next: (response: PostDTOResp[]) => {
        let newPost: PostDTOResp[] = [];

        for (let post of response) {
          const publicationDate = new Date(post.publicationDate);
          post.publicationDate = this.convertsTime(publicationDate);
          newPost.push(post);
        }

        const updatedPost = [...this.allPosts$.value, ...newPost];
        this.allPosts$.next(updatedPost);
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    });

    /**
     * Get all profile information
     */
    this.serv.getProfile().subscribe({
      next: (response: ProfileDTOResp) => {
        this.userProfile = response
        console.log(this.userProfile)

        /**
         * Verifies if the user's profile backdrop image ID exists.
         * If present, makes an API request to fetch the backdrop image as a Blob.
         *
         * - Converts the Blob response to an object URL and bypasses security to create a trusted URL.
         * - Updates the observable `profileImageUrl` with the sanitized URL.
         *
         * Preconditions:
         * - `this.userProfile.profileBackdropImgId` must not be null or undefined.
         *
         * API Response:
         * - Success: Blob representing the profile backdrop image.
         */

        if(this.userProfile.profileBackdropImgId) {
          this.serv.getBackdropProfileImage(this.userProfile.profileBackdropImgId).subscribe({
            next: (response: Blob)=> {
              this.backdropImage = URL.createObjectURL(response);
              const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.backdropImage);
              this.profileBackdropImageUrl.next(updateToSafeUrl);
            },
            error: (err: ErrorResponse) => {
              this.errorMessage = err.message;
            }
          })
        }

        if(this.userProfile.profileImgId) {
          this.serv.getProfileImage(this.userProfile.profileImgId).subscribe({
            next: (response: Blob)=> {
              this.profileImage = URL.createObjectURL(response);
              const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.profileImage);
              this.profileImageUrl.next(updateToSafeUrl)
            }
          })
        }
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    });
    /**
     * Select random preferred game
     */
    this.serv.getPreferredVideogames().subscribe(
      response => {
        this.preferredVideogames = response;
        const randomIndex = Math.floor(Math.random() * response.length);
        this.imgVideogamePreferred=response[randomIndex].iconImgUrl;
        console.log(response)
      }
    )
  }


  convertsTime(publicationDate:Date){
    const now = Date.now(); // Current time in milliseconds
    const timeDifference = now - publicationDate.getTime(); // Difference in milliseconds

    // Convert timeDifference into human-readable units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeElapsed: string;

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
