import {Component, Input} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {ErrorResponse} from '../../models/ErrorResponse';
import {DomSanitizer,SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


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
  profileImage: string = '';
  profileImgUrl = new BehaviorSubject<SafeUrl>(null!);

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

  constructor( private serv: RequestClientService,
               private sanitizer: DomSanitizer,
               private router: Router) {
    setTimeout(() => {
      this.serv.getProfileId(this.post.profileId).subscribe({
        next: (response: ProfileDTOResp) => {
          console.log(response)
          const publicationDate = new Date(this.post.publicationDate);
          this.post.publicationDate = this.convertsTime(publicationDate)
          console.log(this.post);
          this.userProfile = response


          /**
           * Get the profile image from the .GetProfileId API Request
           */
          if(this.userProfile.profileImgId) {
            this.serv.getProfileImage(this.userProfile.profileImgId).subscribe({
              next: (response: Blob)=> {
                console.log(response)
                this.profileImage = URL.createObjectURL(response);
                const updateToSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.profileImage)
                this.profileImgUrl.next(updateToSafeUrl)
              },
              error: (err: ErrorResponse) => {
                this.errorMessage = err.message;
              }
            })
          }
        },
        error: (err: ErrorResponse) =>
          this.errorMessage = err.message
      })
      },10
    )
  };

  ngOnInit() {
    const linkToUserName: HTMLElement = document.getElementById('username')!;
    linkToUserName.onclick = () => {
      this.router.navigate(['/external-user/',this.userProfile.id]).then(r => console.log(this.router.getCurrentNavigation()));
    };
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
