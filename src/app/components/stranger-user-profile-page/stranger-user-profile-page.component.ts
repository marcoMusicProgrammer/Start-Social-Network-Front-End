import {Component} from '@angular/core';
import {PostDTOReq} from '../../models/PostDTOReq';
import {BehaviorSubject} from 'rxjs';
import {PostDTOResp} from '../../models/PostDTOResp';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {VideogameResp} from '../../models/VideogameResp';
import {RequestClientService} from '../../services/request-client.service';
import {CredentialService} from '../../services/credential.service';
import {ErrorResponse} from '../../models/ErrorResponse';
import {UserPostComponent} from '../user-post/user-post.component';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FriendSummuryDTO} from "../../models/FriendSummuryDTO";

@Component({
  selector: 'app-stranger-user-profile-page',
  imports: [
    UserPostComponent,
    FormsModule,
    AsyncPipe,
    NgForOf
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
      lastPlayedVideogameAppId:0,
      profileName:'',
      steamName:'',
      playstationName:'',
      xboxName:'',
      profileImgId:'',
      profileBackdropImgId:'',
      lastPlayedGameImgUrl:'',
      lastPlayedGameName:''
    };

  friendProfile: FriendSummuryDTO = {
    id: 0,
    steamId: '',
    followersCount: 0,
    followingCount: 0,
    favoriteVideogameAppId: null,
    lastPlayedVideogameAppId: null,
    profileName: '',
    // Uncomment if needed in the future
    // steamName: '',
    // playstationName: '',
    // xboxName: '',
    profileImgId: null,
    profileBackdropImgId: null,
    favoriteVideogameImgUrl: null,
    lastPlayedGameImgUrl: null,
    lastPlayedGameName: null,
    profileID: 0,
  };

  // Variables for save image urls
  backdropImage: string = '';
  profileImage: string = '';
  profileBackdropImageUrl = new BehaviorSubject <SafeUrl>(null!);
  profileImageUrl = new BehaviorSubject<SafeUrl>(null!);

  imgVideogamePreferred:string|undefined="https://cdn2.iconfinder.com/data/icons/prohibitions/105/15-512.png";
  nameVideogamePreferred:string|undefined='No favorites';
  preferredVideogames: VideogameResp[] = [];

  isFollowing = false;

  /**
   * When the component is made load both the service and gets all the post and user information
   * @param serv
   * @param servCred
   * @param sanitizer
   * @param activatedRoute
   */
  constructor(
    private serv: RequestClientService,
    private servCred: CredentialService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) {

    let snapshot = activatedRoute.snapshot;
    let id = snapshot.paramMap.get('id');
    let idNumber = Number(id)
    let token= localStorage.getItem('authToken')
    let tokenSpliced: string[]|null = token!.split('-');
    let myID = tokenSpliced[1];

    /**
     * Get all profile information
     */
    this.serv.getProfileId(idNumber).subscribe({
      next: (response: ProfileDTOResp) => {
        this.userProfile = response;

        this.serv.getStrangerUserHisFollowing(idNumber).subscribe({
          next: (response: FriendSummuryDTO[]) => {
            for(let friend of response){

              let friendID = friend.profileID.toString();
              if(friendID === myID)
              {
                this.isFollowing = true;
              }
            }
          }
        })

        this.serv.getUserPostByProfileId(this.userProfile.id).subscribe({
          next: (response: PostDTOResp[]) => {
            let newPost: PostDTOResp[] = [];

            for (let post of response) {
              const publicationDate = new Date(post.publicationDate);
              post.publicationDate = this.convertsTime(publicationDate);
              newPost.push(post);
            }

            const updatedPost = [...this.allPosts$.value, ...newPost];
            this.allPosts$.next(updatedPost);

            if(this.userProfile.profileBackdropImgId) {
              this.serv.getBackdropProfileImage(this.userProfile.profileBackdropImgId).subscribe({
                next: (response: Blob)=> {
                  this.backdropImage = URL.createObjectURL(response);
                  console.log(this.backdropImage);
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
                  console.log(this.profileImage);

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


      },
      error: (err: ErrorResponse) => {
        this.errorMessage = err.message;
      }
    });
    /**
     * Select random preferred game of the stranger
     */
    this.serv.getPreferredVideogamesStranger(idNumber).subscribe(
      response => {
        this.preferredVideogames = response;
        const randomIndex = Math.floor(Math.random() * response.length);
        this.imgVideogamePreferred=response[randomIndex].iconImgUrl;
        this.nameVideogamePreferred=response[randomIndex].videogameName;
      }
    )
  }

  toggleFollow()
  {

    if(!this.isFollowing) {
      this.serv.addFriend(this.userProfile.id).subscribe({
        next: (response: FriendSummuryDTO) => {
          this.friendProfile = response;
          this.isFollowing = true
        },
        error: err => {
          this.errorMessage = err
        }
      })
    } else {
      this.serv.deleteFriendFromFollowing(this.userProfile.id).subscribe({
        next: () => {
          this.isFollowing = false
        }
      })
    }
  }

  convertsTime(publicationDate:Date){
    const now = Date.now(); // Current time in milliseconds
    const timeDifference = now - publicationDate.getTime(); // Difference in milliseconds

    // Convert timeDifference into human-readable units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
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
