import {Component, EventEmitter, output} from '@angular/core';
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
    NgOptimizedImage
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
  croppedImage: SafeUrl  = '';
  croppedImageBlob: Blob | null = null; // Blob to store the cropped image
  isModalOpen = false; // Stato della modale
  backdropImage: string = '';
  profileImageUrl = new BehaviorSubject <SafeUrl>({}); // Store the sanitized image URL
  resizedToWidth="500"

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
        const updatedPost = [...this.allPosts$.value, ...response]; // Spread `response` array
        this.allPosts$.next(updatedPost);
        console.log(this.allPosts$.value);
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    });

    /**
     * Get all profile information and manage an error
     */
    this.serv.getProfile().subscribe({
      next: (response: ProfileDTOResp) => {
        this.userProfile = response
        console.log(this.userProfile)

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

  uploadCroppedImage(blob: Blob): void {
    const formData = new FormData();
    formData.append('imgBackdrop', blob, 'profile-image.png');

    this.serv.saveImage(formData).subscribe({
      next: response => console.log('Image uploaded successfully:', response),
      error: error => console.error('Failed to upload image:', error),
    });
  }


  /**
   * Make a post request to create a Post
   */
  makeAPost() {
    this.serv.newPost(this.newPost).subscribe({
      next: (response: PostDTOResp) => {
        const updatedPosts = [response, ...this.allPosts$.value];
        this.allPosts$.next(updatedPosts);

        // Optionally, reset the `newPost` object
        this.newPost = { content: '', image: '', profileId: 0, nLike: 0 };

        // this.newPost = response;
      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    })
  }
}
