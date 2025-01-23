import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

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

}
