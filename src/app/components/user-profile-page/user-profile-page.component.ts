import {Component, EventEmitter, OnInit, Output, output} from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorResponse} from '../../models/ErrorResponse';
import {PostDTOReq} from '../../models/PostDTOReq';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {CredentialService} from '../../services/credential.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {PostType} from '../../models/PostType';
import {VideogameResp} from '../../models/VideogameResp';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    NgForOf,
    ImageCropperComponent,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    FriendPageComponent,
  ],
  templateUrl: './user-profile-page.component.html',
  standalone: true,
  styleUrl: './user-profile-page.component.css'
})

export class UserProfilePageComponent {

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
      lastPlayedVideogameAppId:0,
      profileName:'',
      steamName:'',
      playstationName:'',
      xboxName:'',
      profileImgId:'',
      profileBackdropImgId:'',
      lastPlayedGameImgUrl:''
    };

  //Events for the cropper
  backdropImageChangedEvent: Event | null = null;
  backdropCroppedImage: SafeUrl = '';
  backdropCroppedImageBlob: Blob | null = null;

  profileImageChangedEvent: Event | null = null;
  profileCroppedImage: SafeUrl = '';
  profileCroppedImageBlob: Blob | null = null;


  isBackdropModalOpen = false;
  isProfileModalOpen = false;

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

  openBackdropModal(): void {
    this.isBackdropModalOpen = true;
  }
  openProfiledModal(): void {
    this.isProfileModalOpen = true;
  }

  closeBackdropModal(): void {
    this.isBackdropModalOpen = false;
  }

  closeProfileModal(): void {
    this.isProfileModalOpen = false;
  }

  backdropFileChangeEvent(event: Event): void {
    this.backdropImageChangedEvent = event;
  }

  profileFileChangeEvent(event: Event): void {
    this.profileImageChangedEvent = event;
  }

  backdropImageCropped(event: ImageCroppedEvent) {
    this.backdropCroppedImage = URL.createObjectURL(event.blob!); // Temporary URL
    this.backdropCroppedImageBlob = event.blob!;
    console.log('Cropped Image URL:', this.backdropCroppedImage);
  }

  profileImageCropped(event: ImageCroppedEvent) {
    this.profileCroppedImage = URL.createObjectURL(event.blob!); // Temporary URL
    this.profileCroppedImageBlob = event.blob!;
    console.log('Cropped Image URL:', this.profileCroppedImage);
  }

  backdropImageLoaded(event: any): void {
    console.log('Image loaded');
  }
  profileImageLoaded(event: any): void {
    console.log('Image loaded');
  }

  backdropCropperReady(): void {
    console.log('Cropper ready');
  }
  profileCropperReady(): void {
    console.log('Cropper ready');
  }

  backdropLoadImageFailed(): void {
    console.error('Load image failed');
  }
  profileLoadImageFailed(): void {
    console.error('Load image failed');
  }

  /**
   * Function from the cropped library
   *
   * Verifies id the croppedImageBlob exists.
   * If present, uploadCroppedImage converts the image and upload it in the server.
   * Creates an url and then pass it to the profileImageUrl
   */
  saveBackdropCroppedImage(): void {
    if (this.backdropCroppedImageBlob) {
      console.log('Saving cropped image:', this.backdropCroppedImageBlob);
      this.uploadBackdropCroppedImage(this.backdropCroppedImageBlob);
      this.backdropImage = URL.createObjectURL(this.backdropCroppedImageBlob);
      const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.backdropImage);
      this.profileBackdropImageUrl.next(updateToSafeUrl);
      this.closeBackdropModal();
    }
  }

  saveProfileCroppedImage(): void {
    if (this.profileCroppedImageBlob) {
      console.log('Saving cropped image:', this.profileCroppedImageBlob);
      this.uploadProfileCroppedImage(this.profileCroppedImageBlob);
      this.profileImage = URL.createObjectURL(this.profileCroppedImageBlob);
      const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.profileImage);
      this.profileImageUrl.next(updateToSafeUrl);
      this.closeProfileModal();
    }
  }

  /**
   * Converts the blob image to a formData.
   * Make a post request sending the data
   * @param blob
   */
  uploadBackdropCroppedImage(blob: Blob): void {
    const formData = new FormData();
    formData.append('imgBackdrop', blob, 'backdrop-image.png');

    this.serv.saveBackdropImage(formData).subscribe({
      next: response => console.log('Image uploaded successfully:', response),
      error: error => console.error('Failed to upload image:', error),
    });
  }

  uploadProfileCroppedImage(blob: Blob): void {
    const formData = new FormData();
    formData.append('imgProfile', blob, 'profile-image.png');

    this.serv.saveProfileImage(formData).subscribe({
      next: response => console.log('Profile Image uploaded successfully:', response),
      error: error => console.error('Failed to upload profile image:', error),
    });
  }

  deletePost(id:number)
  {
    const posts = this.allPosts$.value
    let postWithoutToDelete = posts.filter(p => id != p.id)
    const updatedPostArray = [...postWithoutToDelete]
    this.allPosts$.next(updatedPostArray)
    this.serv.deleteUserPost(id).subscribe({
      next: (response:string) => {
        this.successMessage = response
        console.log(this.successMessage)
      },
      error: err => {
        this.errorMessage = err;
      }
    })
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

  /**
   * Do a post request to create a Post
   */
  makeAPost() {
    this.serv.newPost(this.newPost).subscribe({
      next: (response: PostDTOResp) => {
        const date = new Date(response.publicationDate)
        response.publicationDate = this.convertsTime(date)
        const updatedPosts = [response, ...this.allPosts$.value];
        this.allPosts$.next(updatedPosts);

        this.newPost = { content: '', image: '', profileId: 0, nLike: 0 };
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    })
  }

}
