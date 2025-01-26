import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostDTOResp} from '../../models/PostDTOResp';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {ProfileDTOResp} from '../../models/ProfileDTOResp';
import {timeout} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-post',
  imports: [
    NgIf
  ],
  templateUrl: './user-post.component.html',
  standalone: true,
  styleUrl: './user-post.component.css',

})
export class UserPostComponent {

  @Input() post!: PostDTOResp;
  @Input() user!: ProfileDTOResp;
  @Input() profileImg!: string;
  @Output() delete:EventEmitter<number> = new EventEmitter<number>()

  isStrangeUser = false;

  constructor(private router: Router,
              private serv: RequestClientService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    const snapshot = this.route.snapshot;
    const id = snapshot.paramMap.get('id');
    const token = localStorage.getItem('authToken');

    if (token) {
      const splittedToken: string[] = token.split('-');
      const idToken = splittedToken[1];

      // Check if the user ID matches
      if (this.user?.id && idToken !== this.user.id + '') {
        this.isStrangeUser = true;
      }
    } else {
      console.warn('Auth token not found in localStorage');
    }
  }

  lanciaEvento() {
    this.delete.emit(this.post.id)
  }

}
