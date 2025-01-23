import { Component } from '@angular/core';
import {UserPostComponent} from '../user-post/user-post.component';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorResponse} from '../../models/ErrorResponse';
import {PostDTOReq} from '../../models/PostDTOReq';
import {SignInResponse} from '../../models/SignInResponse';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CredentialService} from '../../services/credential.service';
import {UserDTOResp} from '../../models/UserDTOResp';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    NgForOf,
    ImageCropperComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './user-profile-page.component.html',
  standalone: true,
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {

  errorMessage= '';
  newPost:PostDTOReq = {content:'',image:'',profileId:0,nLike:0}
  allPosts$ = new BehaviorSubject <PostDTOResp[]>([]);
  userProfile!: ProfileDTOResp;
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl  = '';
  isModalOpen = false; // Stato della modale
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
    console.log('Cropped Image URL:', this.croppedImage);
    this.uploadCroppedImage(event.blob!);

    // event.blob can be used to upload the cropped image
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
    if (this.croppedImage) {
      console.log('Cropped image:', this.croppedImage);
      // Puoi inviare l'immagine al backend tramite un servizio
      // if (this.croppedImage instanceof Blob) {
      //   console.log("passa da qua 1")
      //   this.uploadCroppedImage(this.croppedImage);
      // }

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

  // makeAPost() {
  //   this.serv.newPost(this.newPost).subscribe({
  //     next: (response: PostDTOResp) => {
  //       // Add the new post to the beginning of the list dynamically
  //       const updatedPosts = [response, ...this.allPosts$.value];
  //       this.allPosts$.next(updatedPosts);
  //
  //       // Optionally, reset the `newPost` object
  //       this.newPost = { content: '', image: '', profileId: 0, nLike: 0 };
  //     },
  //     error: (err: ErrorResponse) => {
  //       this.errorMessage = err.message;
  //     }
  //   });
  // }

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
