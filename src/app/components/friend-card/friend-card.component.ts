import {Component, Input} from '@angular/core';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {NgIf} from '@angular/common';
import {RequestClientService} from '../../services/request-client.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Router, RouterLink} from '@angular/router';
import {ErrorResponse} from '../../models/ErrorResponse';
import {BehaviorSubject} from 'rxjs';
import {VideogameResp} from '../../models/VideogameResp';
import {FriendSummuryDTO} from '../../models/FriendSummuryDTO';

@Component({
  selector: 'app-friend-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './friend-card.component.html',
  standalone: true,
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() friend!: FriendSummuryDTO;

  errorMessage = '';
  profileImage: string = '';
  profileImgUrl = new BehaviorSubject<SafeUrl>(null!);
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

  imgVideogamePreferred:string|undefined="https://cdn2.iconfinder.com/data/icons/prohibitions/105/15-512.png";
  nameVideogamePreferred:string|undefined='No favorites';
  preferredVideogames: VideogameResp[] = [];

  constructor( private serv: RequestClientService,
               private sanitizer: DomSanitizer,
               private router: Router) {
    setTimeout(() => {
      this.serv.getProfileId(this.friend.profileID).subscribe({
        next:(response : ProfileDTOResp) => {
          this.userProfile = response;
          console.log(this.userProfile);
          /**
           * Get the profile image from the .GetProfileId API Request
           */
          if(this.userProfile.profileImgId) {
            this.serv.getProfileImage(this.userProfile.profileImgId).subscribe({
              next: (response: Blob)=> {
                this.profileImage = URL.createObjectURL(response);
                const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.profileImage)
                this.profileImgUrl.next(updateToSafeUrl)
              },
              error: (err: ErrorResponse) => {
                this.errorMessage = err.message;
              }
            })
          }
          /**
           * Select random preferred game of the stranger
           */
          this.serv.getPreferredVideogamesStranger(this.userProfile.id).subscribe(
            response => {
              this.preferredVideogames = response;
              const randomIndex = Math.floor(Math.random() * response.length);
              this.imgVideogamePreferred=response[randomIndex].iconImgUrl;
              this.nameVideogamePreferred=response[randomIndex].videogameName;
            }
          )
        }
      })
      },10
    )
  };

  navigateToExternalUser() {
    this.router.navigate(['/external-user/',this.userProfile.id])
      .then(r => console.log(this.router.getCurrentNavigation()));

  }

  deleteFollowing(){
    this.serv.deleteFriendFromFollowing(this.userProfile.id).subscribe({
      next: (response: FriendSummuryDTO) => {}
    })
  }
}
