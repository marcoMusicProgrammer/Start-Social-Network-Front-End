import {Component, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {UserProfilePageComponent} from "../user-profile-page/user-profile-page.component";
import {ProfileDTOResp} from "../../models/ProfileDTOResp";

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

  @Input() user!: ProfileDTOResp;

  constructor(private router: Router ) {
  }

  logout()
  {
    localStorage.removeItem('authToken')
    this.router.navigate(['/']).then(s => console.log("Logout"))
  }

}
