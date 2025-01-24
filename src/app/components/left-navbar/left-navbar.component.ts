import {Component, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-navbar',
  imports: [
    NgIf
  ],
  templateUrl: './left-navbar.component.html',
  standalone: true,
  styleUrl: './left-navbar.component.css'
})
export class LeftNavbarComponent {
  constructor(private router: Router ) {
  }

  logout()
  {
    localStorage.removeItem('authToken')
    this.router.navigate(['/']).then(s => console.log("Logout"))
  }

}
