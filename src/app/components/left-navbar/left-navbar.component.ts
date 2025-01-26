import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {UserProfilePageComponent} from "../user-profile-page/user-profile-page.component";
import {ProfileDTOResp} from "../../models/ProfileDTOResp";
import {RequestClientService} from '../../services/request-client.service';

@Component({
  selector: 'app-left-navbar',
    imports: [
        NgIf,
        RouterLink
    ],
  templateUrl: './left-navbar.component.html',
  standalone: true,
  styleUrl: './left-navbar.component.css'
})
export class LeftNavbarComponent {

  @Output() delete = new EventEmitter<void>();

  constructor(private router: Router, serv:RequestClientService) {
  serv.getProfile().subscribe(profile => {
    this.userProfile = profile;
  })
  }

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


  logout()
  {
    localStorage.removeItem('authToken')
    this.router.navigate(['/']).then(s => console.log("Logout"))
  }

}
