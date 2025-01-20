import { Component } from '@angular/core';
import { UserDTOLoginReq } from "../../models/UserDTOLoginReq"
import { RequestClientService} from '../../services/request-client.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userLogin: UserDTOLoginReq= {username:"",password:""}

  constructor(private serv: RequestClientService) {
  }

  login(){
    this.serv.loginUser(this.userLogin).subscribe(
      (resp) => {
        console.log(resp);
      }
    );
  }
}
