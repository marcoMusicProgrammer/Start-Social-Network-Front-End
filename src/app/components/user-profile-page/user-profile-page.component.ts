import {Component, EventEmitter, OnInit, Output, output} from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorResponse} from '../../models/ErrorResponse';
import {PostDTOReq} from '../../models/PostDTOReq';
import {SignInResponse} from '../../models/SignInResponse';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {CredentialService} from '../../services/credential.service';
import {UserDTOResp} from '../../models/UserDTOResp';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {PostType} from '../../models/PostType';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    NgForOf,
    ImageCropperComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './user-profile-page.component.html',
  standalone: true,
  styleUrl: './user-profile-page.component.css'
})

export class UserProfilePageComponent {

  errorMessage= '';
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

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedImageBlob: Blob | null = null;
  isModalOpen = false;
  backdropImage: string = '';
  profileImageUrl = new BehaviorSubject <SafeUrl>(null!);

  /**
   * When teh component is made load both the service and gets all the post and user information
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
        console.log(response);

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
          this.serv.getProfileImages(this.userProfile.profileBackdropImgId).subscribe({
            next: (response: Blob)=> {
              this.backdropImage = URL.createObjectURL(response);
              const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.backdropImage);
              this.profileImageUrl.next(updateToSafeUrl);
            }
          })
        }
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    })
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = URL.createObjectURL(event.blob!); // Temporary URL
    this.croppedImageBlob = event.blob!;
    console.log('Cropped Image URL:', this.croppedImage);
  }

  imageLoaded(event: any): void {
    console.log('Image loaded');
  }

  cropperReady(): void {
    console.log('Cropper ready');
  }

  loadImageFailed(): void {
    console.error('Load image failed');
  }

  /**
   * Function from the cropped library
   *
   * Verifies id the croppedImageBlob exists.
   * If present, uploadCroppedImage converts the image and upload it in the server.
   * Creates an url and then pass it to the profileImageUrl
   */
  saveCroppedImage(): void {
    if (this.croppedImageBlob) {
      console.log('Saving cropped image:', this.croppedImageBlob);
      this.uploadCroppedImage(this.croppedImageBlob);
      this.backdropImage = URL.createObjectURL(this.croppedImageBlob);
      const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.backdropImage);
      this.profileImageUrl.next(updateToSafeUrl);
      this.closeModal();
    }
  }

  /**
   * Converts the blob image to a formData.
   * Make a post request sending the data
   * @param blob
   */
  uploadCroppedImage(blob: Blob): void {
    const formData = new FormData();
    formData.append('imgBackdrop', blob, 'backdrop-image.png');

    this.serv.saveImage(formData).subscribe({
      next: response => console.log('Image uploaded successfully:', response),
      error: error => console.error('Failed to upload image:', error),
    });
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
