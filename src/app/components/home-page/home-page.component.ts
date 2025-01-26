import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {PostDTOResp} from '../../models/PostDTOResp';
import {BehaviorSubject} from 'rxjs';
import {UserPostComponent} from '../user-post/user-post.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {OtherUsersPostsComponent} from '../other-users-posts/other-users-posts.component';

@Component({
  selector: 'app-home-page',
  imports: [
    UserPostComponent,
    NgForOf,
    AsyncPipe,
    OtherUsersPostsComponent
  ],
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  allOthersUserPosts$ = new BehaviorSubject<PostDTOResp[]>([])

  constructor(private _router: Router, serv: RequestClientService, private router: Router) {
    serv.getOtherUsersPost().subscribe((posts: PostDTOResp[]) => {
      console.log(posts);
      const updatedPost = [...this.allOthersUserPosts$.value,...posts];
      this.allOthersUserPosts$.next(updatedPost)

      const title = document.getElementById("title")
    })
  }
}
